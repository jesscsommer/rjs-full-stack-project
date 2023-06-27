from blueprints import request, session, Resource, Blueprint, make_response, g, abort 
from blueprints.user_by_id import user_schema
from models import db


signup_bp = Blueprint("signup", __name__, url_prefix="/signup")

class Signup(Resource):
    def post(self): 
        try: 
            data = request.get_json()
            password = data.get("password")

            with db.session.begin():
                user_schema.validate(data)
                new_user = user_schema.load(data)
                new_user.password_hash = password 
                db.session.add(new_user)

                session['user_id'] = new_user.id 

            return make_response(user_schema.dump(new_user), 201)
        except Exception as e: 
            return make_response({"errors": [str(e)]}, 422)
