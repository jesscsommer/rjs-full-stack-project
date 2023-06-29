from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.comment import Comment
from schemas.comment_schema import CommentSchema

comments_schema = CommentSchema(many=True)
comments_bp = Blueprint("comments", __name__, url_prefix="/comments")

class Comments(Resource):
    def get(self):
        comments = comments_schema.dump(Comment.query.order_by(Comment.created_at.desc()).all())
        return make_response(comments, 200)