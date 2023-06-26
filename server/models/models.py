from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model,SerializerMixin):
    __tablename__="users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False,unique=True)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    # relationships
    comments = db.relationship("Comment", back_populates="user")
    follows = db.relationship("Follow", back_populates="follower")
    followers = db.relationship("Follow", back_populates="beeing_followed")
    posts = db.relationship("Post", back_populates="user")
    post_likes = db.relationship("PostLike", back_populates="user")
    comment_likes = db.relationship("CommentLike", back_populates="user")
    
    #serialization
    serialize_rules=("-comments.user","-follows.follower","-follwer.followee","-post.user","post_likes.user","-comment_likes.user")
    
    @validates(username)
    def validate_username(self,key,username):
        pass


class Follow(db.Model,SerializerMixin):
    __tablename__="follows"
    
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    being_followed_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    created_at = db.Colum(db.DateTime, server_default=db.func.now())

    
    follower=db.relationship("User",back_populates="follows")
    being_followed=db.relationship("User",back_populates="followers")
    
    serialize_rules=("-follower.follows","-being_follwed.followers")
    
    
class Post(db.Model,SerializerMixin):
    __tablename__="posts"
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    created_at = db.Colum(db.DateTime, server_default=db.func.now())
    
    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post")
    post_likes = db.relatioship("PostLikes", back_populates="post")
    
    
class Comment(db.Model,SerializerMixin):
    __tablename__="comments"
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer,db.ForeignKey("post.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    created_at = db.Colum(db.DateTime, server_default=db.func.now())

    
    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")
    comment_likes = db.relationship("CommentLikes", back_populates="comment")
    
class PostLike(db.Model,SerializerMixin):
    __tablename__="post_likes"
    
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    created_at = db.Colum(db.DateTime, server_default=db.func.now())
    
    post = db.relationship("Post", back_populates="post_likes")

    
class CommentLike(db.Model,SerializerMixin):
    __tablename__="comment_likes"
    
    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.Integer, db.ForeignKey("comment.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    created_at = db.Colum(db.DateTime, server_default=db.func.now())
    
    comment = db.relationship("Comment", back_populates="comment_likes")