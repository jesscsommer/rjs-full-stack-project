from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Post
)
from .post_like_schema import PostLikeSchema
from .comment_schema import CommentSchema
from .user_schema import UserSchema

class PostSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Post
        load_instance = True
        ordered = True
        fields = ("id", "content", "user", "comments", "post_likes", "url")

    post_likes = fields.Nested(PostLikeSchema, 
                                only=("id", "url"), many=True)
    user = fields.Nested(UserSchema, only=("id", "username", "name", "url"))
    comments = fields.Nested(CommentSchema, only=("id", "url"), many=True)
    content = fields.String(required=True, \
                            validate=validate.Length(min=1, max=150, \
                            error="Comment must be less than 150 chars"))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "postbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("posts")
        }
    )