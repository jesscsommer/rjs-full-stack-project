from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.post import Post
from schemas.post_schema import PostSchema
from blueprints import request, session, Resource, Blueprint, make_response, g, abort
from flask import Flask, jsonify

post_schema = PostSchema()
post_by_id_bp = Blueprint("post_by_id", __name__, 
                                    url_prefix="/posts/<int:id>")

class PostById(Resource):
    def get(self, id):
        post = post_schema.dump(db.session.get(Post, id))
        return make_response(post, 200)
    
    def delete(self, id):
        try:
            post = db.session.get(Post, id)
            db.session.delete(post)
            db.session.commit()
            return make_response(jsonify({}), 204)
        except Exception as e:
            return make_response(jsonify({"error": "PostLike not found"}), 404)
