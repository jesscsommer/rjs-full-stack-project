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
    follower_id = db.Column(db.Integer, ForeignKey=("user.id"))
    being_followed_id = db.Column(db.Integer, ForeignKey=("user.id"))
    
    follower=db.relationship("User",back_populates="follows")
    being_followed=db.relationship("User",back_populates="followers")
    
class Comment(db.Model,SerializerMixin):
    __tablename__="comments"
    
    id = db.Column(db.Integer, primary_key=True)
    
class Post(db.Model,SerializerMixin):
    __tablename__="posts"
    
    id = db.Column(db.Integer, primary_key=True)
    
class PostLike(db.Model,SerializerMixin):
    __tablename__="post_likes"
    
    id = db.Column(db.Integer, primary_key=True)
    
class CommentLike(db.Model,SerializerMixin):
    __tablename__="comment_like"
    
    id = db.Column(db.Integer, primary_key=True)