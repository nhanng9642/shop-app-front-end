import { API_URL,SUB_API_URL } from "./config";
import axios from "axios"
export const userServices = {
    signin: async (data) => {
        const res = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const rs = await res.json();
        
        return rs;
    },
    signout: 123,

    getProfile: async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    
        const data = await res.json();
        return data;
    },

    signup: async (data) => {  
        const res = await fetch(`${API_URL}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const rs = await res.json();    
        return rs;
    },

    forgotPassword: async (data) => {
        const res = await fetch(`${API_URL}/users/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const rs = await res.json();    
        if (rs.status !== 'success') {
            throw new Error(rs.message);
        }

        return rs;
    },

    resetPassword: async (data, token) => {
        const res = await fetch(`${API_URL}/users/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const rs = await res.json();    
        if (rs.status !== 'success') {
            throw new Error(rs.message);
        }
        return rs;
    },
    updateMe: async (data) => {
        const token = localStorage.getItem('token');
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        if(data.image){
            formData.append('image', data.image);
        }
        const response = await axios.post(`${API_URL}/users/update-me`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
            mode: 'no-cors',
        })
        return response.data;
    },
    changePassword: async (data) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/users/update-password`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const rs = await res.json();
        return rs;
    },
    payment: async () => {
        const token = localStorage.getItem('token'); 
        const res = await fetch(`${SUB_API_URL}/accounts/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const rs = await res.json();
        return rs; 
    }
}