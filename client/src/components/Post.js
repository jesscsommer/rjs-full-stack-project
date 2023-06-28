import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentsContainer from "./CommentsContainer";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post({ content, user, post_likes, post_id }) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState([]);

  const handleLiked = () => {
    setLiked((current) => !current);
  };
  const handleShow = () => {
    setShowComments(!showComments);
  };

  const handleSubmitComment = (e, submitComment) => {
    e.preventDefault();
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitComment),
    })
      .then((res) => res.json())
      .then((comment) => setNewComment(comment))
      .catch((err) => console.error(err));
  };
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
      <CommentForm handleSubmitComment={handleSubmitComment} />
      <div>
        {showComments ? (
          <div>
            <button onClick={handleShow} className="hide">
              Show
            </button>
          </div>
        ) : (
          <div>
            <button onClick={handleShow}>Hide</button>
            <CommentsContainer post_id={post_id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
