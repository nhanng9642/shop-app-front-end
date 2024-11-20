import { API_URL } from "./config";

const URL = API_URL + '/category';

export const CategoryService = {
    getCategories: async (page, limit) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${URL}?page=${page}&size=${limit}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data;
    },

    getCategory: async (id) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${URL}/${id}`, {
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
        const res = await fetch(URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
        });
        const data = await res.json();
        if (data.success === false)
            throw new Error(data.message);
        return data.data;
    },

    updateCategory: async (category) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${URL}/${category.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
        });
        const data = await res.json();
        if (data.success === false)
            throw new Error(data.message);
        return data;
    },

    deleteCategory: async (id) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${URL}/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        
        const data = await res.json();
        if (data.success === false)
            throw new Error(data.message);

        return data;
    },
}