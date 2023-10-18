import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    comments: [],
    error: ''
}

export const fetchComment = createAsyncThunk('comments/fetchComment', (commentId) => {
        return axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
            .then((response) => {
                // console.log("response comment: ", response.data)
                if (response.data == null) {
                    console.log(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
                }
                return response.data
            })
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchComment.pending, (state, action) => {
            // const emptyComment = {
            //     id: action.meta.arg,
            //     loading: true
            // }
            // state.comments.push(emptyComment)
            // state.comments = [...state.comments, emptyComment],
        })
        builder.addCase(fetchComment.fulfilled, (state, action) => {
            state.comments = [...state.comments, action.payload]
            state.error = ''
        })
        builder.addCase(fetchComment.rejected, (state, action) => {
            state.loading = false
            state.comments = []
            state.error = action.error.message
        })
    }
})

export default commentsSlice.reducer
