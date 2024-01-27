import axios from "axios";
import { API_URL, SUB_API_URL } from './config';

export const ProductService = {
    getProducts: async (page = 1, limit = 7) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/books?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    },
    getProductsWithFilter: async (query) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/books?${query}`, {
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
        const response = await fetch(`${API_URL}/books/top-lower?${query}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
           
        });
        const data = await response.json();
        return data;
    }
    ,
    addProduct: async (product) => {
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('author', product.author);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('publisher', product.publisher);
        formData.append('publishedYear', product.publishedYear);

        if (product.image)
            formData.append('image', product.image);
        formData.append('categoryID', product.categoryID);
        formData.append('inventory', product.inventory);

        const response = await axios.post(`${API_URL}/books`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        })
        return response;
    },

    updateProduct: async (product) => {
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('author', product.author);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('publisher', product.publisher);
        formData.append('publishedYear', product.publishedYear);

        if (product.image)
            formData.append('image', product.image);
        formData.append('categoryID', product.categoryID);
        formData.append('inventory', product.inventory);

        const response = await axios.patch(`${API_URL}/books/${product._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        })
        return response;
    },

    deleteProduct: async (id) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    },

    getProduct: async (id) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/books/${id}`, {
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