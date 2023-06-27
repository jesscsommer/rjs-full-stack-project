import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";

function CommentsContainer({ post_id, user_id }) {
  const [comments, setComments] = useState([]);
  const [likedComment, setLikedComment] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/comments")
      .then((r) => r.json())
      .then((allComments) =>
        setComments(allComments.filter((comment) => comment.post_id == post_id))
      )
      .catch((err) => console.error(err));
  });

  const handleSubmitComment = (e, submitComment) => {
    e.preventDefault();
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitComment),
    })
      .then((res) => res.json())
      .then((comment) => setComments((current) => [...current, comment]))
      .catch((err) => console.error(err));
  };

  const handleLikedComment = () => {
    setLikedComment((current) => !current);
  };

  return (
    <div className="comments">
      <CommentForm handleSubmitComment={handleSubmitComment} />
      <div>
        {comments.map((comment) => {
          return (
            <div className="comment">
              <div>{comment.user_id}</div>
              <div className="comment-text">{comment.content}</div>
              <button onClick={handleLikedComment}>
                {likedComment ? (
                  <div className="unlike">Heart</div>
                ) : (
                  <div className="like">Heart</div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommentsContainer;
