import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchComment} from "./commentSlice.js";
import parse from 'html-react-parser'

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
        buttonKidsState = <button onClick={() => setShowAnswers(true)}>Show answers</button>
    } else {
        buttonKidsState = <button onClick={() => setShowAnswers(false)}>Hide answers</button>
    }

    return (

        <div>
            {comment
            && !comment.deleted
            && !comment.dead
                ? <div className='comment-wrapper'>
                    <h4>{comment.by}</h4><span>{formatDate(comment.time)}</span>
                    <div>{parse(comment.text)}</div>
                </div>
                : null
            }
            {comment && comment.kids ? buttonKidsState : null}
            {showAnswers &&
                <div style={{paddingLeft: "30px", borderLeft: "1px solid"}}>
                    {comment && comment.kids && comment.kids.map(id =>
                        <Comment key={id} commentId={id}/>
                    )}
                </div>
            }
        </div>
    )
}