import { API_URL, SUB_API_URL } from "./config";

export const AccountService = {
    getAccounts: async () => {
        const response = await fetch(`${SUB_API_URL}/accounts`);
        const data = await response.json();
        return data;
    },

    getAccount: async (id) => {
        const response = await fetch(`${SUB_API_URL}/accounts/${id}`);
        const data = await response.json();
        return data;
    },

    createAccount: async (account) => {
        const response = await fetch(`${SUB_API_URL}/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        const data = await response.json();
        return data;
    },

    updateAccount: async (account) => {
        const response = await fetch(`${SUB_API_URL}/accounts/${account.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        const data = await response.json();
        return data;
    },

    deleteAccount: async (id) => {
        const response = await fetch(`${SUB_API_URL}/accounts/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    }


}