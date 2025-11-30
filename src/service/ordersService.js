import axiosService from "./axiosService";

export const fetchOrdersApi = async () => {

    try {
        const { data } = await axiosService.get('/carts?limit=30');
        return data?.orders || [];
    } catch (error) {
        throw error;
    }
};

export const fetchOrderByIdApi = async (id) => {
    try {
        const { data } = await axiosService.get(`/orders/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

