import { configureStore } from '@reduxjs/toolkit'
import storyReducer from '../features/story/storyPageSlice.js'
import storiesReducer from '../features/story/storiesSlice.js'

// const logger = reduxLogger.createLogger()

const store = configureStore({
    reducer: {
        stories: storiesReducer,
        story: storyReducer
    },
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

export default store