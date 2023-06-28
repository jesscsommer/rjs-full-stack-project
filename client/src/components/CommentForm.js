import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useState } from "react";

function CommentForm({ post_id, user_id, handleSubmitComment }) {
  const initialCommentForm = {
    post_id: { post_id },
    user_id: { user_id },
    content: "",
  };
  const [submitComment, setSubmitComment] = useState(initialCommentForm);

  const handleAddComment = (e) => {
    setSubmitComment({ ...submitComment, [e.target.name]: e.target.value });
  };

  return (
    <div class="new-comment">
      <form onSubmit={(e) => handleSubmitComment(e, submitComment)}>
        <span>
          <AddReactionOutlinedIcon />
        </span>
        <input
          onChange={handleAddComment}
          placeholder="Add a Comment ..."
          name="content"
        ></input>
        <button>
          <AddBoxOutlinedIcon />
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
