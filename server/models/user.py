from .__init__ import db

class User(db.Model):
    __tablename__="users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False,unique=True)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    profile_pic = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    # relationships
    comments = db.relationship("Comment", back_populates="user")
    follows = db.relationship("Follow", back_populates="follower")
    followers = db.relationship("Follow", back_populates="being_followed")
    posts = db.relationship("Post", back_populates="user")
    post_likes = db.relationship("PostLike", back_populates="user")
    comment_likes = db.relationship("CommentLike", back_populates="user")
    
    