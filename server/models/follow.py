from .__init__ import db

class Follow(db.Model):
    __tablename__="follows"
    
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    being_followed_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    follower=db.relationship("User",back_populates="follows")
    being_followed=db.relationship("User",back_populates="followers")
    
    