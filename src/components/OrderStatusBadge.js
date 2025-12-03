import { Chip } from "@mui/material";

const OrderStatusBadge = ({ status, size = 'small' }) => {
    const getStatusColor = (status) => {
        const statusColors = {
            'Pending': 'warning',
            'Shipped': 'info',
            'Delivered': 'success',
            'Cancelled': 'error',
            'Processing': 'default',
            'Completed': 'success',

        };
        return statusColors[status] || 'default';
    };

    const getStatusLabel = (status) => {
        return status || 'Unknown';
    };

    return (
        <Chip
            label={getStatusLabel(status)}
            color={getStatusColor(status)}
            size={size}
        />
    );
};

export default OrderStatusBadge;

