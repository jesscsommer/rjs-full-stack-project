#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api

from models.comment_like import CommentLike
from models.comment import Comment
from models.post_like import PostLike
from models.post import Post
from models.user import User

#TODO: blueprint imports 
from blueprints.posts import Posts, posts_schema

#TODO: add resources to API
api.add_resource(Posts, "/posts")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
