import { configureStore } from '@reduxjs/toolkit'
import storyReducer from '../features/story/storyPageSlice.js'
import storiesReducer from '../features/story/storiesSlice.js'
import commentsReducer from '../features/comment/commentSlice.js'

const store = configureStore({
    reducer: {
        stories: storiesReducer,
        story: storyReducer,
        comments: commentsReducer
    },
})

export default store