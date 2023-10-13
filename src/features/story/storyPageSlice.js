import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    story: [],
    error: ''
}

export const fetchStory = createAsyncThunk('story/fetchStory', (storyId) => {
        return axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
            .then((response) =>  response.data)
    }
)

const storySlice = createSlice({
    name: 'story',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchStory.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchStory.fulfilled, (state, action) => {
            state.loading = false
            state.story = action.payload
            state.error = ''
        })
        builder.addCase(fetchStory.rejected, (state, action) => {
            state.loading = false
            state.story = []
            state.error = action.error.message
        })
    }
})

export default storySlice.reducer
