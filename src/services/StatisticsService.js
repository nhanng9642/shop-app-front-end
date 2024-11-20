import { API_URL } from './config';


export const StatisticsService = {
    getTotalRevenue: async () => {
        const token = localStorage.getItem('token');
        const link = `${API_URL}/statistic/total-revenue`;
        const response = await fetch(link, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data.data;
    },

    getTotalOrders: async () => {
        const token = localStorage.getItem('token');
        const link = `${API_URL}/statistic/total-order`;
        const response = await fetch(link, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data.data;
    },

    getTotalProducts: async () => {
        const token = localStorage.getItem('token');
        const link = `${API_URL}/statistic/total-book`;
        const response = await fetch(link, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data.data;
    },

    getTotalUsers: async () => {
        const token = localStorage.getItem('token');
        const link = `${API_URL}/statistic/total-user`;
        const response = await fetch(link, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data.data;
    },

    getTopProducts: async (size) => {
        const token = localStorage.getItem('token');
        const link = `${API_URL}/statistic/best-selling-books?size=${size}`;
        const response = await fetch(link, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data.data;
    },

    getMonthlyRevenue: async () => {
        const token = localStorage.getItem('token');
        const link = `${API_URL}/statistic/monthly-revenue`;
        const response = await fetch(link, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data.data;
    },

    getTopLowerBooks: async () => {
        const token = localStorage.getItem('token');
        const link = `${API_URL}/book?size=5&sort=asc`;
        const response = await fetch(link, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
      
        return data.data;
    }
}