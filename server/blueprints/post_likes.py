from blueprints import Resource, Blueprint, g, abort, request
from models import db
from models.post_like import PostLike
from schemas.post_like_schema import PostLikeSchema
from schemas.user_schema import UserSchema
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify

post_likes_schema = PostLikeSchema(many=True)
post_like_schema = PostLikeSchema()
post_likes_bp = Blueprint("post_likes", __name__, url_prefix="/post_likes")

class PostLikes(Resource):
    def get(self):
        post_likes = post_likes_schema.dump(PostLike.query.all())
        return make_response(post_likes, 200)
    def post(self):
        try:
            data = request.get_json()
            post_like = PostLike(**data)
            db.session.add(post_like)
            db.session.commit()
            return make_response(jsonify(post_like_schema.dump(post_like)), 201)
        except Exception as e:
            return make_response({'error':[str(e)]}, 400)
        
    # def post(self):
    #     try:
    #         data = request.json
    #         with db.session.begin():
    #             #* Validate the data, if problems arise you'll see ValidationError
    #             crew_member_schema.validate(data)
    #             #* Deserialize the data with dump()
    #             crew = crew_member_schema.load(data)
    #             db.session.add(crew)
        
    #         #* Serialize the data and package your JSON response
    #         serialized_crew = crew_member_schema.dump(crew)
    #         return make_response(serialized_crew, 201)
    #     except (ValidationError, ValueError) as e:
    #         abort(400, str(e))