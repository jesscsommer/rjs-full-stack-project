from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    User
)

class UserSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = User
        load_instance = True
        ordered = True
        fields = ("id", "username", "name", "bio", "posts", "comments", 
                    "follows", "followers", "url")

    # add the nested field info to exclude unneeded stuff 

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "userbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("users")
        }
    )