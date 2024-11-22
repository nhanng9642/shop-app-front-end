import { API_URL } from './config';

export const ProductService = {
    getProducts: async (page = 1, limit = 7) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/book?page=${page}&size=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        return res;
    },

    getProductsWithFilter: async (query) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/book?${query}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
           
        });
        const data = await response.json();
        return data;
    },

    getLowerStockProducts: async (query) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/book?${query}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
           
        });
        const data = await response.json();
        return data;
    },

    addProduct: async (product) => {
        const token = localStorage.getItem('token');
        const formData = createFormData(product);

        const response = await fetch(`${API_URL}/book`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            body: formData,
        });
        
        const res = await response.json();
        if (!res.success)
            throw new Error(res.message);

        return res;
    },

    updateProduct: async (product) => {
        const token = localStorage.getItem('token');
        const formData = createFormData(product);

        const response = await fetch(`${API_URL}/book/${product.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            body: formData,
        });
        
        const res = await response.json();
        if (!res.success)
            throw new Error(res.message);

        return res;
    },

    deleteProduct: async (id) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/book/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const res = await response.json();

        if (!res.success)
            throw new Error(res.message);
        return res;
    },

    getProduct: async (id) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/book/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data.data;
    },  
}

const createFormData = (data)  => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value);
        }
    });
    return formData;
}