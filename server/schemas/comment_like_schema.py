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

    # add the nested field info to exclude unneeded stuff 

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "commentlikebyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("commentlikes")
        }
    )