from .__init__ import db

user_following = db.Table(
    "user_following",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)

class User(db.Model):
    __tablename__="users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False,unique=True)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    public_acct = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    # relationships
    comments = db.relationship("Comment", back_populates="user")
    posts = db.relationship("Post", back_populates="user")
    post_likes = db.relationship("PostLike", back_populates="user")
    comment_likes = db.relationship("CommentLike", back_populates="user")

    following = db.relationship(
        "User", lambda: user_following,
        primaryjoin=lambda: User.id == user_following.c.follower_id, 
        secondaryjoin=lambda: User.id == user_following.c.followed_id,
        backref = "followers"
    )
    
    