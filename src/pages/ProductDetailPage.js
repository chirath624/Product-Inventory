import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import { fetchProductById, updateProduct } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import ConfirmationDialog from '../components/ConfirmationDialog';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { selectedProduct, updateStatus, error } =
        useAppSelector((state) => state.products);
    const [formState, setFormState] = useState({ stock: 0, isActive: true });
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        console.log(selectedProduct)
        if (selectedProduct) {
            setFormState({
                stock: selectedProduct.stock,
                isActive: selectedProduct.isActive
            });
        }
    }, [selectedProduct]);

    const canSubmit = useMemo(() => Number(formState.stock) >= 0, [formState.stock]);

    const handleSubmit = () => {
        if (!canSubmit) return;
        setConfirmOpen(true);
    };

    const handleConfirm = () => {
        setConfirmOpen(false);
        dispatch(
            updateProduct({
                id,
                changes: {
                    stock: 10,
                    isActive: formState.isActive
                }
            })
        )
            .unwrap()
            .then(() => {
                dispatch(
                    showSnackbar({
                        message: 'Product updated successfully',
                        severity: 'success'
                    })
                );
            })
            .catch((updateError) => {
                dispatch(
                    showSnackbar({
                        message: updateError || 'Unable to update product',
                        severity: 'error'
                    })
                );
            });
    };


    if (!selectedProduct) {
        return (
            <Typography color="error">
                {error || 'Product not found. Please go back to the list.'}
            </Typography>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Product Details
            </Typography>
            < ProductCard product={selectedProduct} />
            <Box
                component="form"
                sx={{ mt: 4, p: 3, borderRadius: 1, bgcolor: 'background.paper' }}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Update Inventory
                </Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        type="number"
                        label="Stock quantity"
                        value={formState.stock}
                        onChange={(e) =>
                            setFormState((prev) => ({ ...prev, stock: e.target.value }))
                        }
                        InputProps={{ inputProps: { min: 0 } }}
                    />
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography>Inactive</Typography>
                        <Switch
                            checked={formState.isActive}
                            onChange={(e) =>
                                setFormState((prev) => ({ ...prev, isActive: e.target.checked }))
                            }
                        />
                        <Typography>Active</Typography>
                    </Stack>
                </Stack>
                <Button
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                >
                    Submit
                </Button>
            </Box>
            <ConfirmationDialog
                open={confirmOpen}
                title="Confirm update"
                message="Are you sure you want to apply these changes?"
                onCancel={() => setConfirmOpen(false)}
                onConfirm={handleConfirm}
            />
        </Box>
    );
};

export default ProductDetailPage;

