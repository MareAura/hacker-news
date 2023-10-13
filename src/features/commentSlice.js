import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    stories: [],
    error: ''
}

export const fetchComment = createAsyncThunk('storyId/fetchComment', async ({id}) => {
        const storiesIds = await axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((response) => response.data)

        const storiesPromises = storiesIds.map(storyId => {
            return axios
                .get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
                .then((response => response.data))
        })

        return Promise.all(storiesPromises)
    }
)


const storySlice = createSlice({
    name: 'comments',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchComment.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchStories.fulfilled, (state, action) => {
            state.loading = false
            state.comments = action.payload
            state.error = ''
        })
        builder.addCase(fetchStories.rejected, (state, action) => {
            state.loading = false
            state.stories = []
            state.error = action.error.message
        })
    }
})

export default storySlice.reducer