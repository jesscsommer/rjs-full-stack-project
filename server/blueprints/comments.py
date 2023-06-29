from blueprints import session, request, Resource, Blueprint, make_response, g, abort
from models import db
from models.comment import Comment
from models.user import User
from schemas.comment_schema import CommentSchema

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)
comments_bp = Blueprint("comments", __name__, url_prefix="/comments")


class Comments(Resource):
    def get(self):
        comments = comments_schema.dump(Comment.query.all())
        return make_response(comments, 200)

    def post(self):
        try:
            data = request.get_json()
            content = data.get("content")
            post_id = data.get("post_id")

            if id := session.get("user_id"):
                current_user = db.session.get(User, id)

                new_comment = Comment(content=content)
                new_comment.user = current_user
                new_comment.post_id = post_id

                comment_schema.validate(new_comment)

                db.session.add(new_comment)
                db.session.commit()

                return make_response(comment_schema.dump(new_comment), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"errors": [str(e)]}, 400)
