import { API_URL } from "./config";

export const CategoryService = {
    getCategories: async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/categories`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data.data;
    },

    getCategory: async (id) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/categories/${id}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data.data;
    },

    createCategory: async (category) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/categories`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
        });
        const data = await res.json();
        if (data.status !== 'success')
            throw new Error(data.message);
        return data.data;
    },

    updateCategory: async (category) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/categories/${category._id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
        });
        const data = await res.json();
        if (data.status !== 'success')
            throw new Error(data.message);
        return data;
    },

    deleteCategory: async (id) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/categories/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        
        return res;
    },
}