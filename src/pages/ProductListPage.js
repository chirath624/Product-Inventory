import {Box, Typography} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useEffect} from "react";
import {fetchProducts} from "../store/productSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";


const ProductListPage = () => {
    const dispatch = useAppDispatch();
    const {  items } = useAppSelector(
        (state) => state.products
    );


    useEffect(() => {
            dispatch(fetchProducts());

    }, [dispatch]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Name', flex: 1 },
        { field: 'category', headerName: 'Category', width: 150 },
        {
            field: 'price',
            headerName: 'Price',
            width: 120,
        },
        { field: 'stock', headerName: 'Stock', width: 120 },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 120
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,

        }
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={items}
                    columns={columns}
                    pageSizeOptions={[10, 20, 50]}
                    onPaginationModelChange={(model) => {
                        console.log(model);
                    }}
                    loading={false}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default ProductListPage;

