import { API_URL } from "./config";
import axios from "axios";
import { fetchWithToken } from "./utils";

const fetchNoToken = (url, method, data) => fetchWithToken(url, method, data, false);

const URL = API_URL + '/auth';

export const signin = (data) => fetchNoToken(`${URL}/login`, 'POST', data);

export const signup = (data) => fetchNoToken(`${URL}/sign-up`, 'POST', data);

export const forgotPassword = (data) => 
    fetchNoToken(`${URL}/recover-password?email=${data.email}`, 'GET', undefined);

export const resetPassword = (data, token) =>
    fetchNoToken(`${URL}/reset-password?token=${token}`, 'POST', data);

export const updateMe = async (data) => {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (data.image) {
        formData.append('image', data.image);
    }
    const response = await axios.post(`${API_URL}/users/update-me`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
        mode: 'no-cors',
    });
    return response.data;
};

export const changePassword = (data) => fetchNoToken(`${API_URL}/user/change-password`, 'POST', data);

export const signInWithGoogle = (data) => fetchNoToken(`${URL}/oauth2/google`, 'POST', data);

export const signInWithFacebook = (data) => {
    return fetchNoToken(`${URL}/oauth2/facebook`, 'POST', data);
}