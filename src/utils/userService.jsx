export const userServices = {
    signin: async (data) => {
        const res = await fetch('https://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const rs = await res.json();
        console.log(rs);
        
        return rs;
    },
    signout: 123,

    getProfile: async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('https://localhost:3000/api/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    
        const data = await res.json();
        return data;
    }
}
