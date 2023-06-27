import { useState } from "react";
import CommentForm from './CommentForm'
import CommentsContainer from './CommentsContainer'

function Post({content, user, post_likes, post_id}) {
  const [showComments, setShowComments] = useState(true);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState([])

  const handleLiked = () => {
    setLiked((current) => !current);
  };
  const handleShow = () => {
    setShowComments((current) => !current);
  };

  const handleSubmitComment = (e, submitComment) => {
    e.preventDefault()
    fetch('/comments', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(submitComment)
    }).then(res => res.json())
    .then(comment => setNewComment(comment))
    .catch(err => console.error(err))
  }
  return (
    <div className="post">
      <div>{user}</div>
      <div className="comment-text">{content}</div>
      <button onClick={handleLiked}>
        {liked ? (
          <div className="unlike">Heart{post_likes.length}</div>
        ) : (
          <div className="like">Heart{post_likes.length}</div>
        )}
      </button>
      <CommentForm handleSubmitComment={handleSubmitComment}/>
      <div>
        {showComments ? (
          <div>
            <button onClick={handleShow} className="hide">Show</button>
          </div>
        ) : (
          <div>
            <button onClick={handleShow}>Hide</button>
            <CommentsContainer post_id={post_id} />
          </div>
        )}
      </div>
    </div>)
}

export default Post;
