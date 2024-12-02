import { API_URL } from './config';
import { fetchFormData, fetchWithToken } from './utils';

const URL = API_URL + '/book';

export const getProducts = (page = 1, size = 7) => 
    fetchWithToken(`${URL}?page=${page}&size=${size}`)

export const getProductsWithFilter = (query = "", size = 10, page = 0) => 
    fetchWithToken(`${URL}?size=${size}&page=${page}&filter=${query}`)

export const getLowerStockProducts = (size) => 
    fetchWithToken(`${URL}?size=${size}`)

export const addProduct = (product) => fetchFormData(URL, product)

export const updateProduct = (product) => fetchFormData(`${URL}/${product.id}`, product, "PUT")

export const deleteProduct = (id) => 
    fetchWithToken(`${URL}/${id}`, "DELETE")

export const getProduct = (id) => 
    fetchWithToken(`${URL}/${id}`)
