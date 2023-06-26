from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Follow
)

class FollowSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Follow
        load_instance = True
        ordered = True
        fields = ("id", "follower", "being_followed", "url")

    # add the nested field info to exclude unneeded stuff 

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "followbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("follows")
        }
    )