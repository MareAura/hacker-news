import {useEffect} from "react";
import {fetchStories} from "./storiesSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

export const StoriesView = () => {
    const stories = useSelector((state) => state.stories)

    let { storiesType } = useParams()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchStories(storiesType))
    }, [storiesType])

    function formatDate (seconds) {
        const date = new Date(seconds*1000)
        return date.toUTCString().slice(5, 22)
    }

    return (
        <div>
            <h2>List of news</h2>
            {stories.loading && <div>Loading...</div>}
            {!stories.loading && stories.error ? <div>Error: {stories.error}</div> : null}
            {!stories.loading && stories.stories.length ? (
                <ul>
                    {
                        stories.stories.map(story =>(
                        <li key={story.id}>
                            <div>
                                <Link to={`/story/${story.id}`}>
                                    {story.title}
                                </Link>
                                <div className='story-info-wrapper'>
                                    <div className='story-info'>
                                        <img className='icon' src='src/assets/like.png' alt='like icon'/>
                                        {story.score}
                                    </div>
                                    <div className='story-info'>
                                        <img className='icon' src='src/assets/user.png' alt='author icon'/>
                                        by {story.by}
                                    </div>
                                    <div className='story-info'>
                                        <img className='icon' src='src/assets/time.png' alt='time icon'/>
                                        {formatDate(story.time)}
                                    </div>
                                </div>
                            </div>
                        </li>
                        ))
                    }
                </ul>
            ) : null}
        </div>
    )
}