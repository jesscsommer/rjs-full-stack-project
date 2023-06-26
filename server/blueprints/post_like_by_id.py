from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.post_like import PostLike
from schemas.post_like_schema import PostLikeSchema

post_like_schema = PostLikeSchema()
post_like_by_id_bp = Blueprint("post_like_by_id", __name__, 
                                    url_prefix="/post_likes/<int:id>")

class PostLikeById(Resource):
    def get(self, id):
        post_like = post_like_schema.dump(db.session.get(PostLike, id))
        return make_response(post_like, 200)