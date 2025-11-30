import axiosService from "./axiosService";



export const fetchProductsApi = async () => {
    const { data } = await axiosService.get('/products?limit=100');
    return data?.products || [];
};

export const fetchProductByIdApi = async (id) => {
    const { data } = await axiosService.get(`/products/${id}`);
    return data;
};

export const updateProductApi = async ({ id, changes }) => {
    const { data } = await axiosService.put(`/products/${id}`, changes);
    return data;
};

