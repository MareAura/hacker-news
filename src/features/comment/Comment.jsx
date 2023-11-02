import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchComment} from "./commentSlice.js";
import parse from 'html-react-parser'
import user from "../../assets/user.png";
import time from "../../assets/time.png";

export const Comment = (props) => {

    const [showAnswers, setShowAnswers] = useState(false)

    const comment = useSelector((state) => state.comments.comments.find(comment => comment.id === props.commentId))
    const dispatch = useDispatch()

    useEffect(() => {
        if (!comment) {
            dispatch(fetchComment(props.commentId))
        }
    }, [props.commentId, comment])

    function formatDate(seconds) {
        const date = new Date(seconds * 1000)
        return date.toUTCString().slice(5, 22)
    }

    let buttonKidsState

    if (!showAnswers) {
        buttonKidsState = <button className='answers-button' onClick={() => setShowAnswers(true)}>▼ Show answers</button>
    } else {
        buttonKidsState = <button className='answers-button' onClick={() => setShowAnswers(false)}>▲ Hide answers</button>
    }

    return (
        <div className='comment-wrapper'>
            {comment
            && !comment.deleted
            && !comment.dead
                ? <div >
                    <div className='comment-info-wrapper'>
                        <div className='comment-info'><img className='comment-icon' src={user} alt='author icon'/>{comment.by}</div>
                        <div className='comment-info'><img className='comment-icon' src={time} alt='time icon'/>{formatDate(comment.time)}</div>
                    </div>
                    <div className='comment-text'>{parse(comment.text)}</div>
                </div>
                : null
            }
            {comment && comment.kids ? buttonKidsState : null}
            {showAnswers &&
                <div style={{paddingLeft: "30px", marginTop: "10px", borderLeft: "1px solid grey"}}>
                    {comment && comment.kids && comment.kids.map(id =>
                        <Comment key={id} commentId={id}/>
                    )}
                </div>
            }
        </div>
    )
}