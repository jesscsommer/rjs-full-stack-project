import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

function CommentForm({ post, currentUser, handleNewComment }) {
  const [comment, setComment] = useState({
    post: post,
    user: currentUser,
    content: "",
  });

  const handleCommentChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = (e) => {
    console.log("new comment clicked!")
    e.preventDefault();
    const newComment = {
      content: comment.content,
      post_id: post.id,
      user_id: currentUser.id,
    };
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((newComment) => console.log(newComment))
      .catch((err) => console.error(err));
    handleNewComment(comment);

    setComment({
      post: post,
      user: currentUser,
      content: "",
    });
  };

  return (
    <div className="new-comment">
      <form onSubmit={handleSubmitComment} style={{ display: "flex" }}>
        <TextField
          sx={{ bgcolor: "lightGrey" }}
          onChange={handleCommentChange}
          placeholder="Add a Comment ..."
          name="content"
          value={comment.content}
        ></TextField>
        <Button type="submit" variant="contained">{<SendIcon />}</Button>
      </form>
    </div>
  );
}

export default CommentForm;
