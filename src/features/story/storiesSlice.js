import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    stories: [],
    error: ''
}

export const fetchStories = createAsyncThunk('storyId/fetchStories', async (args) => {

        const storiesIds = await axios
            .get(`https://hacker-news.firebaseio.com/v0/${args.storiesType}.json`)
            .then((response) => response.data.slice(0, (20 * args.page)))

        const storiesPromises = storiesIds.map(storyId => {
            return axios
                .get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
                .then((response => response.data))
        })

        return Promise.all(storiesPromises)
    }
)


const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchStories.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchStories.fulfilled, (state, action) => {
            state.loading = false
            state.stories = action.payload
            state.error = ''
        })
        builder.addCase(fetchStories.rejected, (state, action) => {
            state.loading = false
            state.stories = []
            state.error = action.error.message
        })
    }
})

export default storiesSlice.reducer
