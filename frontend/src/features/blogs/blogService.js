import axios from 'axios';

// const  API_URL = 'http://localhost:5000/blogs/'
const API_URL = 'https://s3wr2vk90a.execute-api.ap-southeast-2.amazonaws.com/dev';

// Get user blogs
const getBlogs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/`, config);

    return response.data;
}

// Create new blog
const postBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/`, blogData, config);

    return response.data;
}

const updateBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // console.log("Actual url", API_URL + blogData._id)
    const response = await axios.put(`${API_URL}/` + blogData._id, blogData, config);

    return response.data;
}

const deleteBlog = () => {

}

const blogService = {
    getBlogs,
    postBlog,
    updateBlog,
    deleteBlog
}

export default blogService