import { useState, useEffect } from "react"

function CommentsContainer(post_id){
    const [comments, setComments] = useState([])
    const [likedComment, setLikedComment] = useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/comments')
        .then(r => r.json())
        .then(allComments => setComments(allComments.filter(comment => comment.post_id == post_id)))
        .catch(err => console.error(err))
    })

    const handleLikedComment = () => {
        setLikedComment(current => !current)
    }

    return(
        <div className="comments">
            {comments.map(comment => {
                return (<div className="comment">
                    <div>{comment.user_id}</div>
                    <div className='comment-text'>{comment[content]}</div>
                    <button onClick={handleLikedComment}>
                        {likedComment ? <div className="unlike">Heart</div> : <div className='like'>Heart</div>}
                    </button>
                </div>)
            })}
        </div>
    )
}

export default CommentsContainer;