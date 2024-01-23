import { API_URL, SUB_API_URL } from "./config";

export const AccountService = {
    getAccounts: async (page = 1, limit = 7) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${SUB_API_URL}/accounts?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    },

    getAccount: async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${SUB_API_URL}/accounts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        return data.data;
    },

    createAccount: async (account) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${SUB_API_URL}/accounts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        const data = await response.json();
        return data;
    },

    updateAccount: async (account) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${SUB_API_URL}/accounts/${account._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        const data = await response.json();
        return data;
    },

    deleteAccount: async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${SUB_API_URL}/accounts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'DELETE'
        });

        return response;
    }


}