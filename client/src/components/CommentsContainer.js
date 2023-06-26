import { useState, useEffect } from "react"

function CommentsContainer(){
    const [comments, setComments] = useState([])
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        fetch('http://localhost:3000/comments')
        .then(r => r.json())
        .then(data => setComments(data))
        .catch(err => console.error(err))
    })

    const handleLiked = () => {
        setLiked(current => !current)
    }

    return(
        <div className="comments">
            {comments.map(comment => {
                return (<div className="comment">
                    <img className="comment-photo" src={comment['image_uri']}/>
                    <div className='comment-text'>{comment[text]}</div>
                    <button onClick={handleLiked}>
                        {liked ? <div className="unlike">Heart</div> : <div className='like'>Heart</div>}
                    </button>
                </div>)
            })}
        </div>
    )
}

export default CommentsContainer;