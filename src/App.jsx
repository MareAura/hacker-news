import './App.css'
import {StoriesView} from "./features/story/StoriesView.jsx";
import { Routes, Route } from 'react-router-dom';
import {StoryView} from "./features/story/StoryPageView.jsx";
import Navbar from "./features/Navbar.jsx";

function App() {

    return (
        <div className='App'>
            <Navbar/>
            <div className='main-content'>
                <Routes>
                    <Route path="/:storiesType" element={<StoriesView />} />
                    <Route path="/story/:storyId" element={<StoryView />} />
                </Routes>
            </div>
        </div>
    )
}

export default App