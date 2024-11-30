import { API_URL } from "./config";
import { fetchWithToken } from "./utils";

const URL = API_URL + '/category';

export const getCategories = (page, limit) =>
    fetchWithToken(`${URL}?page=${page}&limit=${limit}`, 'GET');

export const getCategory = (id) => fetchWithToken(`${URL}/${id}`, 'GET');

export const createCategory = (category) => 
    fetchWithToken(URL, 'POST', category);

export const updateCategory = (category) => 
    fetchWithToken(`${URL}/${category.id}`, 'PUT', category);

export const deleteCategory = async (id) =>
    fetchWithToken(`${URL}/${id}`, 'DELETE');