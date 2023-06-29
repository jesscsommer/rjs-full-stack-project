from blueprints import request, session, Resource, Blueprint, make_response, g, abort 
from blueprints.user_by_id import user_schema
from models import db
from models.user import User

signup_bp = Blueprint("signup", __name__, url_prefix="/signup")

class Signup(Resource):
    def post(self): 
        if not session["user_id"]: 
            try: 
                data = request.get_json()

                username = data.get("username")
                password = data.get("password")

                if User.query.filter(User.username == username).first(): 
                    return make_response({"error": "Username must be unique"}, 400)
                
                new_user = User(username=username, public_acct=True)
                new_user.password_hash = password 

                db.session.add(new_user)
                db.session.commit()

                session['user_id'] = new_user.id 

                return make_response(user_schema.dump(new_user), 201)
            except Exception as e: 
                return make_response({"error": [str(e)]}, 422)
        return make_response({'error': 'Already logged in'}, 400) 
