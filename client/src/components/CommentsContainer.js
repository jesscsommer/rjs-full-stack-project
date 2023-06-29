import Comment from "./Comment";
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";

function CommentsContainer({ post, currentUser }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch("/comments")
      .then((r) => r.json())
      .then((allComments) =>
        setComments(
          allComments.filter((comment) => comment.post.id === post.id)
        )
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="comments">
      {currentUser ? <CommentForm /> : null}

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
