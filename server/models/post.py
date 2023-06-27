from .__init__ import db
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

class Post(db.Model):
    __tablename__="posts"
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post")
    post_likes = db.relationship("PostLike", back_populates="post")

    #serialization rules
    serilize_only = ('id', 'content', 'user_id', 'created_at')
    serilize_rules = ('-user', '-comment', '-post-likes')

    #validation
    @validates('content')
    def validate_content(self, key, content):
        if not content or len(content.strip())<0:
            raise AssertionError('Content cannot be empty!')
        return content