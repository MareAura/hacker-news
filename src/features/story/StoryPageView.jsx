import {useEffect} from "react";
import {fetchStory} from "./storyPageSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import like from '../../assets/like.png'
import time from '../../assets/time.png'
import user from '../../assets/user.png'
import comment from '../../assets/comment.png'
import forward from '../../assets/forward.png'
import {Comment} from "../comment/Comment.jsx";

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

    const kidsIds = story.story.kids ? story.story.kids : []
    return (
        <div className='story-page'>
            {story.loading && <div>Loading...</div>}
            {!story.loading && story.error ? <div>Error: {story.error}</div> : null}
            {!story.loading && story.story ? (
                    <div>
                        <div className='story-link-wrapper'>
                            <a className='story-link' href={story.story.url} target="_blank" rel='noreferrer'>
                                {story.story.title}
                                <img className='forward-icon' src={forward} alt='forward icon'/>
                            </a>
                        </div>
                        {story.story.text ? <div>{story.story.text}</div> : null}
                        <div className='story-info-wrapper'>
                            <div className='story-info'><img className='icon' src={like} alt='like icon'/>{story.story.score}</div>
                            <div className='story-info'><img className='icon' src={user} alt='author icon'/> by {story.story.by}</div>
                            <div className='story-info'><img className='icon' src={time} alt='time icon'/> {formatDate(story.story.time)}</div>
                            <div className='story-info'><img className='icon' src={comment} alt='comment icon'/>
                                {kidsIds.length}
                            </div>
                        </div>
                        {/*<Link to={`/topstories`}>Main page</Link>*/}
                        <div className='comments'>
                            <h3>Comments</h3>
                            {kidsIds.map(id => <Comment key={id} commentId={id}/>)}
                        </div>
                    </div>
            ) : null}
        </div>
    )
}

