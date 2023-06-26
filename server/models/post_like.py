from .__init__ import db

class PostLike(db.Model):
    __tablename__="post_likes"
    
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    post = db.relationship("Post", back_populates="post_likes")