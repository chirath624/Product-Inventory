import {Box, Typography, Chip} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {useEffect} from "react";
import {fetchOrders} from "../store/orderSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";

const OrderListPage = () => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector(
        (state) => state.orders || { items: [], status: 'idle', error: null }
    );

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);



    const columns = [
        { field: 'id', headerName: 'Order ID', width: 120 },
        { field: 'customerId', headerName: 'Customer', width: 150 },
        { field: 'quantity', headerName: 'Items', width: 100 },
        {
            field: 'total',
            headerName: 'Total ($)',
            width: 120,
            valueFormatter: (value) => `$${value?.toFixed(2) || '0.00'}`
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,

        },
        {
            field: 'updatedAt',
            headerName: 'Updated',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return '';
                return new Date(value).toLocaleString();
            }
        }
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={items}
                    columns={columns}
                    pageSizeOptions={[10, 20, 50]}
                    disableRowSelectionOnClick
                    loading={false}
                />
            </Box>

        </Box>
    );
};

export default OrderListPage;
