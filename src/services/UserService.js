import { API_URL  } from "./config";
import { fetchWithToken } from "./utils";

const URL = `${API_URL}/user`;

export const getProfile = async () => fetchWithToken(`${URL}/me`, 'GET');

export const payment = async () => fetchWithToken(`${URL}/payment`, 'POST');
