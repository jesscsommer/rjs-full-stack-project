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
        fields = ("id", "post", "user", "url")

    # add the nested field info to exclude unneeded stuff 

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "postlikebyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("postlikes")
        }
    )