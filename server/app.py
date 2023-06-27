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

from blueprints.comment_likes import CommentLikes
from blueprints.comment_like_by_id import CommentLikeById
from blueprints.comments import Comments
from blueprints.comment_by_id import CommentById
from blueprints.posts import Posts
from blueprints.post_by_id import PostById
from blueprints.post_likes import PostLikes
from blueprints.post_like_by_id import PostLikeById
from blueprints.users import Users
from blueprints.user_by_id import UserById

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


# This will go in the post/patch routes after the form has been created
# saving file name for db
# pic_filename = secure_filename()
# pic_name = str(uuid.uuid1()) + "_" + pic_filename
# saving the image 
# pic_save = request.file["profile_pic"]
# pic_save.profile_pic.save(os.path.join(app.config["UPLOAD_PATH"]),pic_name)
# pic_save.profile_pic = pic_name

if __name__ == '__main__':
    app.run(port=5555, debug=True)
