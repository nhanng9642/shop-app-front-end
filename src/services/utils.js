export const fetchWithToken = async (url, method, data, useToken = true) => {
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