from marshmallow import (fields, validate, validates, ValidationError)
from flask_marshmallow import Marshmallow

from models.comment_like import CommentLike
from models.comment import Comment
from models.follow import Follow
from models.post_like import PostLike
from models.post import Post
from models.user import User

ma = Marshmallow()