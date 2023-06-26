from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Comment
)
from .comment_like_schema import CommentLikeSchema

class CommentSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Comment
        load_instance = True
        ordered = True
        fields = ("id", "content", "user", "post", "comment_likes", "url")

    comment_likes = fields.Nested(CommentLikeSchema, 
                                    only=("id", "url"), many=True)
    post = fields.Nested("PostSchema", only=("id", "url"))
    user = fields.Nested("UserSchema", only=("id", "username", "url"))
    content = fields.String(required=True, \
                            validate=validate.Length(min=1, max=50, \
                            error="Comment must be less than 50 chars"))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "commentbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("comments")
        }
    )