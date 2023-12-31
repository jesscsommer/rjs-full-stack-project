from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.comment_like import CommentLike
from schemas.comment_like_schema import CommentLikeSchema
from flask import Flask, jsonify

comment_like_schema = CommentLikeSchema()
comment_like_by_id_bp = Blueprint("comment_like_by_id", __name__, 
                                    url_prefix="/comment_likes/<int:id>")

class CommentLikeById(Resource):
    def get(self, id):
        comment_like = comment_like_schema.dump(db.session.get(CommentLike, id))
        return make_response(comment_like, 200)
    
    def delete(self, id):
        try:
            comment_like = db.session.get(CommentLike, id)
            db.session.delete(comment_like)
            db.session.commit()
            return make_response(jsonify({}), 204)
        except Exception as e:
            return make_response(jsonify({"error": "PostLike not found"}), 404)
