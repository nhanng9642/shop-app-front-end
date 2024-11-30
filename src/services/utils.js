export const fetchWithToken = async (url, method = "GET", data = undefined, useToken = true) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (useToken) {
        const token = localStorage.getItem('token');
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(data),
    });

    const rs = await res.json();
    if (!rs.success) {
        throw new Error(rs.message);
    }
    return rs;
};

export const extractInputError = (message) => {
    let inputError = message.split(' ')[0].toLowerCase();

    if (inputError === 'first') inputError = 'firstName';
    else if (inputError === 'last') inputError = 'lastName';

    return inputError;
}; 

export const fetchFormData = async (url, data, method = "POST") => {
    const formData = createFormData(data);
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const res = await fetch(url, {
        method,
        headers,
        body: formData,
    });

    const rs = await res.json();
    if (!rs.success) {
        throw new Error(rs.message);
    }
    return rs;
}

const createFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value);
        }
    });
    return formData;
};