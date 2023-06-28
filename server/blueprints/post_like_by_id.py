from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.post_like import PostLike
from schemas.post_like_schema import PostLikeSchema
from blueprints import request, session, Resource, Blueprint, make_response, g, abort
from flask import Flask, jsonify
post_like_schema = PostLikeSchema()
post_like_by_id_bp = Blueprint("post_like_by_id", __name__, 
                                    url_prefix="/post_likes/<int:id>")

class PostLikeById(Resource):
    def get(self, id):
        post_like = post_like_schema.dump(db.session.get(PostLike, id))
        return make_response(post_like, 200)
        
    def delete(self, id):
        try:
            post_like = db.session.get(PostLike, id)
            db.session.delete(post_like)
            db.session.commit()
            return make_response(jsonify({}), 204)
        except Exception as e:
            return make_response(jsonify({"error": "PostLike not found"}), 404)
