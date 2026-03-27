import api from "./axios";

export const getProducts = async () => {
    try {
        const response = await api.get('/products')
        return response.data.data
    } catch (error) {
        console.error(error);
        throw error
    }
}