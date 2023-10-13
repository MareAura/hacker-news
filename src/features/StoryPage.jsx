import React from 'react';
import {useSelector} from "react-redux";
import { useParams } from 'react-router-dom';

function StoryPage(props) {

    const stories = useSelector((state) => state.stories)

    let params = useParams()

    function getStoryById (id) {
        const result = stories.stories.find(elem => elem.id === id)
        return result
    }

   const storyInfo = getStoryById(params.storyId)

    return (
        <div>
            {stories}
        </div>
    );
}

export default StoryPage;