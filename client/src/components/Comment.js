import { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Comment({ currentUser, comment }) {
  const [likedComment, setLikedComment] = useState(false);
  const [newLikedComment, setNewLikedComment] = useState([]);

  useEffect(() => {
    fetch("/api/v1/comment_likes")
      .then((r) => r.json())
      .then((data) => {
        setLikedComment(
          data.find(
            (like) =>
              like.comment?.id == comment?.id &&
              like.user?.id == currentUser?.id
          )
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLikedComment = () => {
    if (currentUser) {
      setLikedComment((current) => !current);
      handleLikedCommentData();
    } else {
      alert("Please login first!");
    }
  };

  const handleLikedCommentData = () => {
    if (likedComment) {
      fetch(`/api/v1/comment_likes/${likedComment.id}`, {
        method: "DELETE",
      });
    } else {
      fetch("/api/v1/comment_likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment_id: comment.id,
          user_id: currentUser.id,
        }),
      })
        .then((res) => res.json())
        .then((like) => setLikedComment(like))
        .catch((err) => console.error(err));
    }
  };
  return (
    <div className="comment">
      <CardContent>
        <Typography variant="body2">{comment.user.username}</Typography>
        <Typography variant="body1" color="text.secondary">
          {comment.content}
        </Typography>
      </CardContent>
      {currentUser ? (
        <IconButton onClick={handleLikedComment}>
          {likedComment ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      ) : null}
    </div>
  );
}

export default Comment;
