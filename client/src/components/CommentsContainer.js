import Comment from './Comment'
import { useState, useEffect } from "react"

function CommentsContainer({post_id}){
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetch('/comments')
        .then(r => r.json())
        .then(allComments => setComments(allComments.filter(comment => comment.post_id == post_id)))
        .catch(err => console.error(err))
    }, [])

    return(
        <div className="comments">
            <div>
            {comments.map(comment => <Comment key={comment.key} content={comment.content} username={comment.user.username}/>)}
            </div>
        </div>
    )
}

export default CommentsContainer;
