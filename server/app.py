#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api

#TODO: import models
from models.comment_like import CommentLike
from models.comment import Comment
from models.post_like import PostLike
from models.post import Post
from models.user import User

#TODO: blueprint imports 
#TODO: add resources to API

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
