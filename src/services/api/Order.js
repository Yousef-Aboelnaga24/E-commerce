import api from "./axios";

export const getOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data?.data ?? [];
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        throw error;
    }
};

export const createOrder = async (items) => {
    try {
        const payload = {
            items: items.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };
        const response = await api.post('/orders', payload);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        throw error;
    }
};

export const updateOrder = async (orderId, data) => {
    try {
        const response = await api.put(`/orders/${orderId}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const response = await api.delete(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting order:", error.response?.data || error.message);
        throw error;
    }
};