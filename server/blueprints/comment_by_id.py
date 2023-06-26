from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.comment import Comment
from schemas.comment_schema import CommentSchema

comment_schema = CommentSchema()
comment_by_id_bp = Blueprint("comment_by_id", __name__, 
                                    url_prefix="/comments/<int:id>")

class CommentById(Resource):
    def get(self, id):
        comment = comment_schema.dump(db.session.get(Comment, id))
        return make_response(comment, 200)