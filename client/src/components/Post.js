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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom"

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

const Post = ({ currentUser, post }) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState([]);
  const [newLike, setNewLike] = useState([]);

  const handleLiked = () => {
    if (currentUser){
      setLiked((current) => !current);
      handleLikedData()
    } else {
      alert('Please login first!')
    }
  };

  const handleLikedData = () => {
    if (liked) {
      fetch(`/post_likes/${newLike.id}`,{
        method: 'DELETE'
      })
    } else {
      fetch("/post_likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({post_id: post.id, user_id: currentUser.id}),
      })
        .then((res) => res.json())
        .then((like) => setNewLike(like))
        .catch((err) => console.error(err));
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
    <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="post"></Avatar>}
          action={
            <IconButton aria-label="follow user">
              <PersonAddIcon />
            </IconButton>
          }
          title={post.user.name}
          subheader={post.user.username}
          component={Link}
          to={`/profile/${post.user.username}`}
        />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to likes" onClick={handleLiked}>
          {post.post_likes?.length}{" "}
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="view comments"
        >
          <AddCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentsContainer post={post} currentUser={currentUser} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
