import React, {useEffect} from "react";
import {fetchStory} from "./storyPageSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import like from '../../assets/like.png'
import time from '../../assets/time.png'
import user from '../../assets/user.png'
import comment from '../../assets/comment.png'

export const StoryView = () => {

    let { storyId } = useParams()

    const story = useSelector((state) => state.story)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchStory(storyId))
    }, [])

    function formatDate (seconds) {
        const date = new Date(seconds*1000)
        return date.toUTCString().slice(5, 22)
    }

    return (
        <div>
            <h2>Story</h2>
            {story.loading && <div>Loading...</div>}
            {!story.loading && story.error ? <div>Error: {story.error}</div> : null}
            {!story.loading && story.story ? (
                    <div>
                        <div> {story.story.title} <a href={story.story.url} target="_blank">Read the source</a></div>
                        <div className='story-info-wrapper'>
                            <div className='story-info'><img className='icon' src={like} alt='like icon'/>{story.story.score}</div>
                            <div className='story-info'><img className='icon' src={user} alt='author icon'/> by {story.story.by}</div>
                            <div className='story-info'><img className='icon' src={time} alt='time icon'/> {formatDate(story.story.time)}</div>
                            <div className='story-info'><img className='icon' src={comment} alt='comment icon'/>
                                {story.story.hasOwnProperty('kids') ? story.story.kids.length : 0}
                            </div>
                        </div>
                        <Link to={`/`}>Main page</Link>
                    </div>
            ) : null}
        </div>
    )
}

