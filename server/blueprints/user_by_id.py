from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.user import User
from schemas.user_schema import UserSchema

user_schema = UserSchema()
user_by_id_bp = Blueprint("user_by_id", __name__, 
                                    url_prefix="/users/<int:id>")

class UserById(Resource):
    def get(self, id):
        user = user_schema.dump(db.session.get(User, id))
        return make_response(user, 200)