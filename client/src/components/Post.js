import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentsContainer from "./CommentsContainer";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from "react-router-dom";

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

const Post = ({ currentUser, post, handlePostDelete }) => {
  const [currentPost, setCurrentPost] = useState(post)
  const post_like_for_user = currentPost.post_likes.find(pl => pl.user_id == currentUser?.id)

  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(post_like_for_user)
  const [newComment, setNewComment] = useState([]);
  const [numLikes, setNumLikes] = useState(currentPost.post_likes?.length)

  const haiku_lines = post.content.split("\n")

  const handleLikedData = () => {
    if (liked) {
      fetch(`/post_likes/${liked.id}`, {
        method: "DELETE",
      }).then(res => {
        setNumLikes(numLikes => numLikes - 1)
        setLiked(like => !like);
      });
    } else {
      fetch("/post_likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: post.id, user_id: currentUser.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNumLikes(numLikes => numLikes + 1)
          setLiked(like => data);
        })
        .catch((err) => console.error(err));
    }
  };
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

  const avatarColors = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
  ];

  const cardColors = [
    "#CFD8DC",
    "#A1887F",
    "#FF8A65",
    "#FFB74D",
    "#FFD54F",
    "#FFF176",
    "#DCE775",
    "#AED581",
    "#80CBC4",
    "#81D4FA",
  ];

  const randAvaColor =
    avatarColors[Math.floor(Math.random() * avatarColors.length)];

  const randCardColor =
    cardColors[Math.floor(Math.random() * cardColors.length)];
  return (
    <Card sx={{ maxWidth: 345, bgcolor: randCardColor, my: 2, marginTop: "0" }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ bgcolor: randAvaColor }} 
            alt={`${post.user.username} avatar`}
            src={`../${post.user.profile_pic_num}.png`}
            aria-label="post" />
        }
        title={post.user.name}
        subheader={post.user.username}
        component={Link}
        to={`/profile/${post.user.username}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {haiku_lines[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {haiku_lines[1]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {haiku_lines[2]}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", alignSelf: "flex-end" }}>
        { currentUser ? 
          <IconButton aria-label="add to likes" onClick={handleLikedData}>
            {numLikes}{" "}
            {liked ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          : null }
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="view comments"
        >
          <AddCommentIcon />
        </ExpandMore>

        {post.user?.id === currentUser?.id ? <DeleteForeverIcon onClick={() => handlePostDelete(post.id)} /> : <></>}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentsContainer post={post} currentUser={currentUser} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
