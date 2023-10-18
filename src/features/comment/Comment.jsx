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


    return (

        <ul>
             {comment
                && !comment.deleted
                && !comment.dead
                 ? <li>{parse(comment.text)}</li>
                 : null
             }
        </ul>
    )
}
