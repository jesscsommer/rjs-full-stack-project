from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Follow
)
from .user_schema import UserSchema

class FollowSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Follow
        load_instance = True
        ordered = True
        fields = ("id", "follower", "being_followed", "url")

    follower = fields.Nested("UserSchema", only=("id", "username", "url"))
    being_followed = fields.Nested("UserSchema", only=("id", "username", "url"))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "followbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("follows")
        }
    )