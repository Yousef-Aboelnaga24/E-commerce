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