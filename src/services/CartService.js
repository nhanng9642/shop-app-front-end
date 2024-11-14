import { API_URL } from "./config";

export const cartService = {
	getCartItems: async () => {
		const token = localStorage.getItem('token')
		const res = await fetch(`${API_URL}/users/cart/items`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
		})
		const rs = await res.json();
		return rs;		
	},
	addCartItem: async (data) => {
		const token = localStorage.getItem('token')
		const res = await fetch(`${API_URL}/users/cart/items`,{
			method: 'POST', 
			headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data)
		})
		const rs = await res.json();
		return rs;
	},
	updateCartItem: async (data)=> {
		const token = localStorage.getItem('token');
		const res = await fetch(`${API_URL}/users/cart/items/${data.id}`,{
			method: 'PATCH', 
			headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data)
		});
		const rs = await res.json();
		return rs;
	},
	deleteCartItem: async (id) => {
		const token = localStorage.getItem('token');
		const res = await fetch(`${API_URL}/users/cart/items/${id}`,{
			method: 'DELETE', 
			headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
			},
		});
		return res;
	},
	deleteAllCartItem: async () => {
		const token = localStorage.getItem('token');
		const res = await fetch(`${API_URL}/users/cart/items/all`,{
			method: 'DELETE', 
			headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
			},
		});
		return res;
	}
}