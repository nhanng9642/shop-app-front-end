import { API_URL } from "./config";
import axios from "axios";
import { fetchWithToken } from "./utils";

const URL = API_URL + '/auth';

export const signin = (data) => fetchWithToken(`${URL}/login`, 'POST', data);

export const signup = (data) => fetchWithToken(`${URL}/sign-up`, 'POST', data, false);

export const forgotPassword = (data) => fetchWithToken(`${URL}/reset-password`, 'POST', data, false);

export const resetPassword = (data, token) => fetchWithToken(`${URL}/recovery-password/${token}`, 'POST', data);

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

export const changePassword = (data) => fetchWithToken(`${API_URL}/user/change-password`, 'POST', data);

export const signInWithGoogle = (data) => fetchWithToken(`${URL}/oauth2/google`, 'POST', data, false);

export const signInWithFacebook = (data) => {
    return fetchWithToken(`${URL}/oauth2/facebook`, 'POST', data, false);
}