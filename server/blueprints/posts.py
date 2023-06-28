from blueprints import session, request, Resource, Blueprint, make_response, g, abort 
from blueprints.post_by_id import post_schema
from models import db
from models.post import Post
from models.user import User
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
            content = data.get("content")

            if id := session.get("user_id"):
                current_user = db.session.get(User, id)

                new_post = Post(content=content)
                new_post.user = current_user

                post_schema.validate(new_post)

                db.session.add(new_post)
                db.session.commit()
                
                return make_response(post_schema.dump(new_post), 201)
        except Exception as e: 
            db.session.rollback()
            return make_response({"errors": [str(e)]}, 400)