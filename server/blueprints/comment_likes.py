from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.comment_like import CommentLike
from schemas.comment_like_schema import CommentLikeSchema

comment_likes_schema = CommentLikeSchema(many=True)
comment_likes_bp = Blueprint("comment_likes", __name__, url_prefix="/comment_likes")

class CommentLikes(Resource):
    def get(self):
        comment_likes = comment_likes_schema.dump(CommentLike.query.all())
        return make_response(comment_likes, 200)