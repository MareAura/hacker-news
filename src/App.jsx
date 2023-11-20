import './App.css'
import {StoriesView} from "./features/story/StoriesView.jsx";
import { Routes, Route } from 'react-router-dom';
import {StoryView} from "./features/story/StoryPageView.jsx";
import Navbar from "./features/Navbar.jsx";
import { Navigate } from "react-router-dom";



function App() {

    return (
        <div className='App'>
            <Navbar/>
            <div className='main-content'>
                <Routes>
                    <Route path="/" element={<Navigate to="/topstories" replace={true} />} />
                    <Route path="/:storiesType" element={<StoriesView />} />
                    <Route path="/story/:storyId" element={<StoryView />} />
                </Routes>
            </div>
        </div>
    )
}

export default App