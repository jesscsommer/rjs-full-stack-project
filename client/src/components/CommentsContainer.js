import Comment from "./Comment";
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";

function CommentsContainer({ post, currentUser }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/api/v1/comments")
      .then((r) => r.json())
      .then((allComments) =>
        setComments(
          allComments.filter((comment) => comment.post.id === post.id)
        )
      )
      .catch((err) => console.error(err));
  }, []);

  const handleNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  return (
    <div className="comments" sx={{ maxWidth: 345 }}>
      {currentUser ? (
        <CommentForm
          post={post}
          currentUser={currentUser}
          handleNewComment={handleNewComment}
        />
      ) : null}

      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}

export default CommentsContainer;
