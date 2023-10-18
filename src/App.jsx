import './App.css'
import {StoriesView} from "./features/story/StoriesView.jsx";
import { Routes, Route } from 'react-router-dom';
import {StoryView} from "./features/story/StoryPageView.jsx";

function App() {

    return (
        <div className='App'>
            <Routes>
                <Route path="/" element={<StoriesView />} />
                <Route path="/story/:storyId" element={<StoryView />} />
            </Routes>
        </div>
    )
}

export default App