import { API_URL } from "./config";

export const userServices = {
    signin: async (data) => {
        const res = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const rs = await res.json();
        console.log(rs);
        
        return rs;
    },
    signout: 123,

    getProfile: async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
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
        console.log(rs);
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
    
}
