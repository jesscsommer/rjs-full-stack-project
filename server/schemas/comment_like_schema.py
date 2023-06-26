from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    CommentLike
)

class CommentLikeSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = CommentLike
        load_instance = True
        ordered = True
        fields = ("id", "comment", "user", "url")

    comment = fields.Nested("CommentSchema", only=("id", "url"))
    user = fields.Nested("UserSchema", only=("id", "username", "url"))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "commentlikebyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("commentlikes")
        }
    )