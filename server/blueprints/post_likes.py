from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.post_like import PostLike
from schemas.post_like_schema import PostLikeSchema

post_likes_schema = PostLikeSchema(many=True)
post_likes_bp = Blueprint("post_likes", __name__, url_prefix="/post_likes")

class PostLikes(Resource):
    def get(self):
        post_likes = post_likes_schema.dump(PostLike.query.all())
        return make_response(post_likes, 200)