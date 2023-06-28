from marshmallow import EXCLUDE
from blueprints import request, session, Resource, Blueprint, make_response, g, abort 
from config import app
from models import db
from models.user import User
from schemas.user_schema import UserSchema

user_schema = UserSchema()
user_by_id_bp = Blueprint("user_by_id", __name__, 
                                    url_prefix="/users/<int:id>")

class UserById(Resource):
    def get(self, id):
        if user := user_schema.dump(db.session.get(User, id)): 
            return make_response(user, 200)
        return make_response({"error": "User not found"}, 404)
    def patch(self, id):
        if user := db.session.get(User, id): 
            try:
                data = request.get_json()
                user_schema.validate(data)
                # import ipdb; ipdb.set_trace()

                updated_user = user_schema.load(data,
                                                instance=user, partial=True)
                db.session.commit()

                return make_response(user_schema.dump(updated_user), 200)
            
            except Exception as e: 
                db.session.rollback()
                return make_response({"errors": [str(e)]}, 400)
        return make_response({"error": "User not found"}, 404)