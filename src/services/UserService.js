import { API_URL  } from "./config";
import { fetchWithToken } from "./utils";

const URL = `${API_URL}/user`;

export const getProfile = async () => fetchWithToken(`${URL}`);

export const addOrder = async (data) => fetchWithToken(`${URL}/order`, 'POST', data);

export const getOrder = async () => fetchWithToken(`${URL}/order`);

export const getCartItems = async () => fetchWithToken(`${URL}/cart`);

export const addCartItem = async (data) => fetchWithToken(`${URL}/cart`, 'POST', data);

export const updateCartItem = async (data) => fetchWithToken(`${URL}/order/${data.id}`, 'PUT', data);

export const deleteCartItem = async (data) => fetchWithToken(`${URL}/order/${data.id}`, 'DELETE');

export const deleteAllCartItem = async () => fetchWithToken(`${URL}/order`, 'DELETE');