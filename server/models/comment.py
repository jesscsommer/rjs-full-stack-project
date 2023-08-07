from .__init__ import db

class Comment(db.Model):
    __tablename__="comments"
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    post_id = db.Column(db.Integer,db.ForeignKey("posts.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")
    comment_likes = db.relationship("CommentLike", back_populates="comment")

    def __repr__(self):
        return (
            f"Comment #{self.id}: "
            + f"{self.content}"
        )