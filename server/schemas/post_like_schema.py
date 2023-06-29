from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    PostLike
)

class PostLikeSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = PostLike
        load_instance = True
        ordered = True
        fields = ("id", "post", "user", "user_id", "url")

    post = fields.Nested("PostSchema", only=("id", "url"))
    user = fields.Nested("UserSchema", only=("id", "username", "url"))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "postlikebyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("postlikes")
        }
    )