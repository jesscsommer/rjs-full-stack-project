from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Post
)

class PostSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Post
        load_instance = True
        ordered = True
        fields = ("id", "content", "user", "comments", "post_likes", "url")

    # add the nested field info to exclude unneeded stuff 

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "postbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("posts")
        }
    )