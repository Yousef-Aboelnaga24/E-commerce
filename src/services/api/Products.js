import api from "./axios";

export const getProducts = async (categoryId = null, search = '') => {
    try {
        const params = {};
        if (categoryId) params.category_id = categoryId;
        if (search) params.search = search;

        const response = await api.get('/products', { params })
        return response.data.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const getProduct = async (id) => {
    try {

        const response = await api.get(`/products/${id}`)
        return response.data.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const createProduct = async (productData) => {
    try {
        const response = await api.post('/products', productData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};