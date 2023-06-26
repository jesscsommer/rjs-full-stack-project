from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    User
)

from .post_schema import PostSchema
from .comment_schema import CommentSchema

class UserSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = User
        load_instance = True
        ordered = True
        fields = ("id", "username", "name", "bio", "posts", "comments", 
                    "follows", "followers", "url")

    posts = fields.Nested(PostSchema, only=("id", "content", "url"), many=True)
    comments = fields.Nested(CommentSchema, only=("id", "url"), many=True)
    follows = fields.Nested("UserSchema", 
                            only=("id", "username", "url"), many=True)
    followers = fields.Nested("UserSchema", 
                            only=("id", "username", "url"), many=True)

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "userbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("users")
        }
    )