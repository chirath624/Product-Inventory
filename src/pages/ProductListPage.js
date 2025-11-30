import {Box, Typography} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const ProductListPage = () => {


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
    const dummyRows = [
        { id: 1, title: 'iPhone 15', category: 'Electronics', price: 999, stock: 50, rating: 4.8 },
        { id: 2, title: 'Running Shoes', category: 'Sports', price: 120, stock: 15, rating: 4.2 },
        { id: 3, title: 'Coffee Maker', category: 'Home', price: 85, stock: 0, rating: 3.9 },
        { id: 4, title: 'Gaming Mouse', category: 'Electronics', price: 45, stock: 100, rating: 4.7 },
    ];
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={dummyRows}
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

