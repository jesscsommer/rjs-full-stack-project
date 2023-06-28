from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.comment_like import CommentLike
from schemas.comment_like_schema import CommentLikeSchema
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify

comment_likes_schema = CommentLikeSchema(many=True)
comment_like_schema = CommentLikeSchema()
comment_likes_bp = Blueprint("comment_likes", __name__, url_prefix="/comment_likes")

class CommentLikes(Resource):
    def get(self):
        comment_likes = comment_likes_schema.dump(CommentLike.query.all())
        return make_response(comment_likes, 200)
    def post(self):
        try:
            data = request.get_json()
            comment_like = CommentLike(**data)
            db.session.add(comment_like)
            db.session.commit()
            return make_response(jsonify(comment_like_schema.dump(comment_like)), 201)
        except Exception as e:
            return make_response({'error':[str(e)]}, 400)
