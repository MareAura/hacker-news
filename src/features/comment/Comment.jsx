import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchComment} from "./commentSlice.js";
import parse from 'html-react-parser'

export const Comment = (props) => {

    const comment = useSelector((state) => state.comments.comments.find(comment => comment.id === props.commentId))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchComment(props.commentId))
    }, [props.commentId])

    function formatDate(seconds) {
        const date = new Date(seconds * 1000)
        return date.toUTCString().slice(5, 22)
    }


    return (

        <ul>
            {comment
            && !comment.deleted
            && !comment.dead
                ? <li>
                    <h4>{comment.by}</h4><span>{formatDate(comment.time)}</span>
                    <p>{parse(comment.text)}</p>
                </li>
                : null
            }
        </ul>
    )
}