import axiosService from "./axiosService";
const statuses = [
    'Pending',
    'Shipped',
    'Delivered',
    'Cancelled',
    'Processing',
    'Completed'
];
export const fetchOrdersApi = async (limit) => {
    try {
        const { data } = await axiosService.get('/carts');
        const carts = data?.carts || [];
        return carts.map((cart) => ({
            id: cart.id,
            customerId: cart.userId,
            totalProducts:  cart.totalProducts || 0,
            totalQuantity:cart.totalQuantity ||0,
            total: cart.total || 0,
            discountedTotal: cart.discountedTotal || 0,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            products:cart.products
        }));

    } catch (error) {
        throw error;
    }
};


