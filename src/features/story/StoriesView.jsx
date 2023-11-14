import {useEffect, useState} from "react";
import {fetchStories} from "./storiesSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import like from '../../assets/like.png'
import time from '../../assets/time.png'
import user from '../../assets/user.png'
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
        <div className='story-cards-wrapper'>
            {stories && stories.stories.length ? (
                <div>
                    {
                        stories.stories.map(story =>(
                            <div key={story.id} className='story-card'>
                                <Link to={`/story/${story.id}`}>
                                    {story.title}
                                </Link>
                                <div className='story-info-wrapper'>
                                    <div className='story-info'>
                                        <img className='icon' src={like} alt='like icon'/>
                                        {story.score}
                                    </div>
                                    <div className='story-info'>
                                        <img className='icon' src={user} alt='author icon'/>
                                        by {story.by}
                                    </div>
                                    <div className='story-info'>
                                        <img className='icon' src={time} alt='time icon'/>
                                        {formatDate(story.time)}
                                    </div>
                                    <div className='story-info'><img className='icon' src={comment} alt='comment icon'/>
                                        {(story.kids ? story.kids : []).length}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {!stories.loading && <button onClick={() => setPage(page + 1)} className='more-button'>More</button>}
                </div>
            ) : null}
            {stories.loading && <div className='loading'>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>}
            {!stories.loading && stories.error ? <div>Error: {stories.error}</div> : null}
        </div>
    )
}