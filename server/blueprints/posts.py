from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.post import Post
from schemas.post_schema import PostSchema

posts_schema = PostSchema(many=True, exclude=("user", "comments", "post_likes"))
posts_bp = Blueprint("posts", __name__, url_prefix="/posts")

class Posts(Resource):
    def get(self):
        posts = posts_schema.dump(Post.query.all())
        return make_response(posts, 200)