import api from "./axios";

export const getStatus = async () => {
    try {
        const response = await api.get('/status');
        return response.data ?? {};
    } catch (error) {
        console.error("Error fetching status:", error.response?.data || error.message);
        throw error;
    }
};