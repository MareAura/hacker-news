import React, {useEffect, useState} from 'react';
import axios from "axios";

const Comment = ({commentId}) => {

    const [comment, setComment] = useState(null)

    useEffect(() => {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
            .then(res => setComment(res.data))
    }, [])

    const kidsIds = (!!comment && comment.kids) ? comment.kids : []
    return (
        <div>
            {comment && comment.text}
            <ul>
                {kidsIds.map(id => <li  key={id}><Comment commentId={id} /> </li>)}
            </ul>
        </div>
    );
};

export default Comment;