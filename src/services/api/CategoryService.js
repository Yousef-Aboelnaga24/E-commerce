import api from "./axios";

export const getCategories = async () => {
    try {
        const response = await api.get('/categories')
        return response.data.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const createCategory = async (data) => {
    try {
        const response = await api.post('/categories', data)
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const updateCategory = async (id, data) => {
    try {
        const response = await api.put(`/categories/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/categories/${id}`)
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}