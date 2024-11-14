import { API_URL, SUB_API_URL } from "./config";
import axios from "axios"

export const userServices = {
    signin: async (data) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const rs = await res.json();
        
        if (!rs.success)
            throw new Error(rs.message);
        return rs;
    },

    getProfile: async () => {
        const token = localStorage.getItem('token');
        if (!token) 
            return null;

        const res = await fetch(`${API_URL}/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    
        const data = await res.json();
        return data;
    },

    signup: async (data) => {  
        const res = await fetch(`${API_URL}/auth/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const rs = await res.json();    

        if (!rs.success)
            throw new Error(rs.message);

        return rs;
    },

    forgotPassword: async (data) => {
        const res = await fetch(`${API_URL}/auth/reset-password`, {
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
        const res = await fetch(`${API_URL}/auth/recovery-password/${token}`, {
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
        const res = await fetch(`${API_URL}/user/change-password`,{
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
    },

    extractInputError: (message) => {
        let inputError = message.split(' ')[0].toLowerCase();

        if (inputError === 'first') inputError = 'firstName';
        else if (inputError === 'last') inputError = 'lastName';

        return inputError;
    }
}