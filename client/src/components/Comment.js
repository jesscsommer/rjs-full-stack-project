import { useState } from 'react';

function Comment({content, username}){

    const [likedComment, setLikedComment] = useState(false)

    const handleLikedComment = () => {
        setLikedComment(current => !current)
    }
    return (
        <div className="comment">
            <div>{username}</div>
            <div className='comment-text'>{content}</div>
            <button onClick={handleLikedComment}>
                {likedComment ? <div >Like</div> : <div >Unlike</div>}
            </button>
        </div>)
}

export default Comment