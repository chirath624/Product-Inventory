import {Box, Typography, Button} from "@mui/material";
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import {useEffect, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {
    fetchProducts,
    resetProductFilters,
    selectProductCategories,
    selectProductFilters,
    setProductFilters
} from "../store/productSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterPanel from "../components/FilterPanel";

import {usePagination} from "../hooks/PaginationHook";
import OrderStatusBadge from "../components/OrderStatusBadge";

const ProductListPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const filters = useAppSelector(selectProductFilters);

    const {  items } = useAppSelector(
        (state) => state.products
    );
    const maxPrice = useMemo(() => {
        if (!items.length) return filters.priceRange[1] || 1000;
        return Math.max(...items.map((item) => item.price));
    }, [items, filters.priceRange]);
    const sliderMax = useMemo(
        () => Math.max(maxPrice, filters.priceRange[1] || 1000),
        [maxPrice, filters.priceRange]
    );

    const filteredItems = useMemo(() => {
        if (!items) return [];

        const [min, max] = filters.priceRange || [0, maxPrice];

        return items.filter((item) => {
            const matchesPrice = item.price >= min && item.price <= max;
            return matchesPrice;
        });
    }, [items, filters.priceRange, maxPrice]);
    const {
        page,
        rowsPerPage,
        paginatedData,
        total,
        handlePageChange,
        handleRowsPerPageChange
    } = usePagination(filteredItems, 10);





    useEffect(() => {
            dispatch(fetchProducts());

    }, [dispatch]);

    const handleRowClick = (params) => {
        navigate(`/products/${params.id}`);
    };

    const handleViewClick = (id) => (e) => {
        e.stopPropagation();
        navigate(`/products/${id}`);
    };



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Name', flex: 1 },
        { field: 'category', headerName: 'Category', width: 150 },
        {
            field: 'price',
            headerName: 'Price',
            width: 120,
            valueFormatter: (value) => `$${value?.toFixed(2) || '0.00'}`
        },
        { field: 'stock', headerName: 'Stock', width: 120 },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 120,
            valueFormatter: (value) => {
                const ratingValue = typeof value === 'object' ? value?.rate : value;
                return ratingValue ? ratingValue.toFixed(1) : '0.0';
            }
        },
        {
            field: 'inStock',
            headerName: 'In Stock',
            width: 120,
            renderCell: (params) => {


                return (
                    <>
                        <OrderStatusBadge status={params.availabilityStatus} size={"small"}/>.
                    </>
                );
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label="View"
                    onClick={handleViewClick(params.id)}
                />
            ]
        }
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Box sx={{ height: 600, width: '100%' }}>
                <FilterPanel
                    priceRange={filters.priceRange}
                    maxPrice={sliderMax}
                    onPriceChange={(value) => dispatch(setProductFilters({ priceRange: value }))}
                    onReset={() => dispatch(resetProductFilters())}
                />
                <DataGrid
                    rows={paginatedData}
                    columns={columns}
                    rowCount={total}
                    pagination
                    paginationMode="client"
                    pageSizeOptions={[10, 20, 50]}
                    paginationModel={{ page, pageSize: rowsPerPage }}
                    onPaginationModelChange={(model) => {
                        handlePageChange(null, model.page);
                        handleRowsPerPageChange({
                            target: { value: model.pageSize }
                        });
                    }}
                    onRowClick={(params) => navigate(`/products/${params.id}`)}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default ProductListPage;

