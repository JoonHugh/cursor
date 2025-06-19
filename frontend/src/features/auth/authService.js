import axios from 'axios';

// const API_URL = 'http://localhost:5000/users/'
const API_URL = 'https://s3wr2vk90a.execute-api.ap-southeast-2.amazonaws.com/dev';


// Register user
const register = async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    } // if

    return response.data;
}

// Login user
const login = async (userData) => {
    const response = await axios.post(`${API_URL}/users/login`, userData);

    if (response.status === 200 && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
    } // if

    return response.data;
}

// Logout user
const logout = () => {
    localStorage.removeItem('user');
}

// Update user
const update = async (userData) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }

    const response = await axios.put(`${API_URL}/` + 'me', userData, config);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const authService = {
    register,
    logout,
    login,
    update,
}

export default authService;