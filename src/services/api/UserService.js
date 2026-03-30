import api from "./axios";

export const getUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data.data || response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

export const updateUser = async (id, data) => {
    try {
        const response = await api.put(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}
