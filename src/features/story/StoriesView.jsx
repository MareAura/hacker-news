import {useEffect, useState} from "react";
import {fetchStories} from "./storiesSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import comment from "../../assets/comment.png";

export const StoriesView = () => {
    const stories = useSelector((state) => state.stories)

    const [page, setPage] = useState(1)

    let { storiesType } = useParams()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchStories({storiesType, page}))
    }, [storiesType, page])

    function formatDate (seconds) {
        const date = new Date(seconds*1000)
        return date.toUTCString().slice(5, 22)
    }

    return (
        <div>
            {stories.loading && <div>Loading...</div>}
            {!stories.loading && stories.error ? <div>Error: {stories.error}</div> : null}
            {!stories.loading && stories.stories.length ? (
                <div>
                    {
                        stories.stories.map(story =>(
                            <div key={story.id} className='story-card'>
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
                                    <div className='story-info'><img className='icon' src={comment} alt='comment icon'/>
                                        {(story.kids ? story.kids : []).length}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <button onClick={() => setPage(page + 1)}>More</button>
                </div>
            ) : null}
        </div>
    )
}