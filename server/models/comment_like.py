from .__init__ import db

class CommentLike(db.Model):
    __tablename__="comment_likes"
    
    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    comment = db.relationship("Comment", back_populates="comment_likes")