import { useState } from "react";
import CommentsContainer from './CommentsContainer'

function Post(post_id, content, user){
    const [showComments, setShowComments] = useState(false)
    const [liked, setLiked] = useState(false)

    const handleLiked = () => {
        setLiked(current => !current)
    }

    const handleShow = () => {
        setShowComments(current => !current)
    }
    return (
    <div className="post">
        <div>{user.username}</div>
        <div className='comment-text'>{content}</div>
        <button onClick={handleLiked}>
            {liked ? <div className="unlike">Heart</div> : <div className='like'>Heart</div>}
        </button>
        <div>
            {showComments ?
            <div>
                <button className="hide">Show</button>
            </div> :
            <div>
                <button>Hide</button>
                <CommentsContainer post_id={post_id}/>
            </div>}
        </div>
    </div>)
}

export default Post