import { API_URL } from './config';
import { fetchFormData, fetchWithToken } from './utils';

const URL = API_URL + '/book';

export const getProducts = (page = 1, limit = 7) => 
    fetchWithToken(`${URL}?page=${page}&size=${limit}`)

export const getProductsWithFilter = (query) => 
    fetchWithToken(`${URL}?${query}`)

export const getLowerStockProducts = (size) => 
    fetchWithToken(`${URL}?size=${size}`)

export const addProduct = (product) => fetchFormData(URL, product)

export const updateProduct = (product) => fetchFormData(`${URL}/${product.id}`, product, "PUT")

export const deleteProduct = (id) => 
    fetchWithToken(`${URL}/${id}`, "DELETE")

export const getProduct = (id) => 
    fetchWithToken(`${URL}/${id}`)
