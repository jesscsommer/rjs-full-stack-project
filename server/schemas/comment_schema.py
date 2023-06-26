from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Comment
)

class CommentSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Comment
        load_instance = True
        ordered = True
        fields = ("id", "content", "user", "post", "comment_likes", "url")

    # add the nested field info to exclude unneeded stuff 

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "commentbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("comments")
        }
    )