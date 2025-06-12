import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from './blogService.js';

const initialState = {
    blogs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Get user blog posts
export const getBlogs = createAsyncThunk('blogs/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.getBlogs(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Post new blog 
export const createBlog = createAsyncThunk('blogs/create', async (blogData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.postBlog(blogData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = blogSlice.actions
export default blogSlice.reducer