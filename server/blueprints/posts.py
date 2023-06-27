from blueprints import request, Resource, Blueprint, make_response, g, abort 
from blueprints.post_by_id import post_schema
from models import db
from models.post import Post
from schemas.post_schema import PostSchema

posts_schema = PostSchema(many=True)
posts_bp = Blueprint("posts", __name__, url_prefix="/posts")

class Posts(Resource):
    def get(self):
        posts = posts_schema.dump(Post.query.all())
        return make_response(posts, 200)
    
    def post(self):
        try:
            data = request.get_json()
            with db.session.begin():
                post_schema.validate(data)
                new_post = post_schema.load(data)
                db.session.add(new_post)
            
            return make_response(post_schema.dump(new_post), 201)
        except Exception as e: 
            db.session.rollback()
            return make_response({"errors": [str(e)]}, 400)