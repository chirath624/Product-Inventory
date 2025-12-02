import {
    Box,
    Typography,
    Chip,
    TableBody,
    TableContainer,
    Table,
    Paper,
    TableRow,
    TableCell,
    IconButton,
    TableHead, Collapse, TablePagination
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {fetchOrders} from "../store/orderSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import OrderStatusBadge from "../components/OrderStatusBadge";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {usePagination} from "../hooks/PaginationHook";



const Row = ({ row }) => {
    const [open, setOpen] = useState(false);
    console.log()
    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                    ${row.total?.toFixed(2) || '0.00'}
                </TableCell>

                <TableCell>
                    ${row.discountedTotal?.toFixed(2) || '0.00'}
                </TableCell>

                <TableCell>
                    {row?.totalProducts || 0}
                </TableCell>

                <TableCell>
                    {row?.totalQuantity || 0}
                </TableCell>
                <TableCell>
                    <OrderStatusBadge status={row.status} />
                </TableCell>
            </TableRow>


            <TableRow>
                <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                            <Typography variant="h6" gutterBottom>
                                Products
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Discount %</TableCell>
                                        <TableCell>Discounted Total</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products?.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell>{p.id}</TableCell>
                                            <TableCell>{p.title}</TableCell>
                                            <TableCell>{p.price}</TableCell>
                                            <TableCell>{p.quantity}</TableCell>
                                            <TableCell>{p.total}</TableCell>
                                            <TableCell>{p.discountPercentage}</TableCell>
                                            <TableCell>{p.discountedTotal}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const OrderListPage = () => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector(
        (state) => state.orders || { items: [], status: 'idle', error: null }
    );

    useEffect(() => {
        dispatch(fetchOrders(items.length));
    }, [dispatch]);
 ;


    const {
        page,
        rowsPerPage,
        paginatedData,
        total,
        handlePageChange,
        handleRowsPerPageChange
    } = usePagination(items, 5);




    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Cart ID</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Discounted Total</TableCell>
                            <TableCell>Total Products</TableCell>
                            <TableCell>Total Quantity</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((cart) => (
                            <Row key={cart.id} row={cart} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={total}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            {/*<Typography variant="h4" gutterBottom>*/}
            {/*    Orders*/}
            {/*</Typography>*/}
            {/*<Box sx={{ height: 600, width: '100%' }}>*/}
            {/*    <DataGrid*/}
            {/*        rows={items}*/}
            {/*        columns={columns}*/}
            {/*        pageSizeOptions={[10, 20, 50]}*/}
            {/*        disableRowSelectionOnClick*/}
            {/*        loading={false}*/}
            {/*    />*/}
            {/*</Box>*/}

        </Box>
    );
};

export default OrderListPage;
