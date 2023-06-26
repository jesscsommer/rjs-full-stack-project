from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.post import Post
from schemas.post_schema import PostSchema

post_schema = PostSchema()
post_by_id_bp = Blueprint("post_by_id", __name__, 
                                    url_prefix="/posts/<int:id>")

class PostById(Resource):
    def get(self, id):
        post = post_schema.dump(db.session.get(Post, id))
        return make_response(post, 200)