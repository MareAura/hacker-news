import './App.css'
import {StoriesView} from "./features/story/StoriesView.jsx";
import { Routes, Route } from 'react-router-dom';
import Comment from "./features/Comment.jsx";
import {StoryView} from "./features/story/StoryPageView.jsx";

function App() {

    return (
        <div className='App'>
            <Routes>
                <Route path="/" element={<StoriesView />} />
                <Route path="/comment" element={<Comment commentId={2921506}/>} />
                {/*<Route path="/story/:storyId" element={<StoryPage/>} />*/}
                <Route path="/story/:storyId" element={<StoryView />} />
            </Routes>
        </div>
    )
}

export default App