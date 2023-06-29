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
  // const initial_liked = post.post_likes.find(like => like.user.id == currentUser.id)
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState([]);
  const [allLikes, setAllLikes] = useState(post.post_likes);
  const handleLiked = () => {
    if (currentUser){
      setLiked((current) => !current);
      handleLikedData()
    } else {
      alert('Please login first!')
    }
  };

  useEffect(() => {
    fetch("/post_likes")
      .then((r) => r.json())
      .then((data) => {
        const post_like = data.find((like) => like.post.id === post.id && like.user.id === currentUser?.id)
        if (post_like){
          setLiked(post_like)
        }
        // setLiked(
        //   data.find(
        //     (like) =>
        //       like.post.id === post.id && like.user.id === currentUser.id
        //   )
        // );
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLikedData = () => {
    if (liked) {
      fetch(`/post_likes/${liked.id}`, {
        method: "DELETE",
      }).then(setAllLikes(allLikes.filter((like) => like.id !== liked.id)));
    } else {
      fetch("/post_likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: post.id, user_id: currentUser.id }),
      })
        .then((res) => res.json())
        .then((like) => {
          setAllLikes((current) => [...current, like]);
          setLiked(like);
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
          <Avatar sx={{ bgcolor: randAvaColor }} aria-label="post"></Avatar>
        }
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
      <CardActions sx={{ display: "flex", alignSelf: "flex-end" }}>
        { currentUser ? 
          <IconButton aria-label="add to likes" onClick={handleLiked}>
            {allLikes?.length}{" "}
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
        {post.user.id === currentUser?.id ? <DeleteForeverIcon onClick={() => handlePostDelete(post.id)} /> : <></>}
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
