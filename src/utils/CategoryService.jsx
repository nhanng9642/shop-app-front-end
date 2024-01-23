import { API_URL } from "./config";

export const CategoryService = {
    getCategory: async () => {
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
}