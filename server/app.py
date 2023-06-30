#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

from models.comment_like import CommentLike
from models.comment import Comment
from models.post_like import PostLike
from models.post import Post
from models.user import User

from blueprints.comment_likes import CommentLikes
from blueprints.comment_like_by_id import CommentLikeById
from blueprints.comments import Comments
from blueprints.comment_by_id import CommentById
from blueprints.posts import Posts, posts_schema
from blueprints.post_by_id import PostById
from blueprints.post_likes import PostLikes
from blueprints.post_like_by_id import PostLikeById
from blueprints.users import Users, users_schema
from blueprints.user_by_id import UserById
from blueprints.user_by_name import UserByName
from blueprints.signup import Signup
from blueprints.login import Login
from blueprints.logout import Logout
from blueprints.check_session import CheckSession

api.add_resource(CommentLikes, "/comment_likes")
api.add_resource(CommentLikeById, "/comment_likes/<int:id>")
api.add_resource(Comments, "/comments")
api.add_resource(CommentById, "/comments/<int:id>")
api.add_resource(Posts, "/posts")
api.add_resource(PostById, "/posts/<int:id>")
api.add_resource(PostLikes, "/post_likes")
api.add_resource(PostLikeById, "/post_likes/<int:id>")
api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(UserByName, "/users/<string:username>")
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(CheckSession, "/check_session")

@app.route("/posts/sort-by-likes")
def sort_posts_by_likes():
    query = Post.query \
    .join(Post.post_likes) \
    .group_by(Post.id) \
    .order_by(db.func.count(Post.post_likes).desc()) \
    .with_entities(Post.id, Post.content, Post.user_id, \
                    db.func.count(Post.post_likes).label("like_count"))
    
    posts_by_like = [{
        "id": post.id,
        "content": post.content,
        "user_id": post.user_id,
        "like_count": post.like_count
        } for post in query]

    return make_response(posts_by_like, 200)

@app.route("/liked-posts-by/<int:userid>")
def get_likers_for_posts(userid):
    query = User.query \
            .join(User.post_likes) \
            .join(PostLike.post) \
            .filter(Post.user_id == userid)

    unique_users = { user["username"] for user in users_schema.dump(query) } 

    return make_response(list(unique_users), 200)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
