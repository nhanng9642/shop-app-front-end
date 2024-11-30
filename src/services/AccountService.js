import { API_URL } from "./config";

const URL = API_URL + '/user';

export const AccountService = {
    getAccounts: async (page = 1, limit = 7) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${URL}/all?page=${page}&size=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    },

    getAccount: async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        return data.data;
    },

    updateAccount: async (account) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${URL}/${account.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    },

    deleteAccount: async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'DELETE'
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    }


}