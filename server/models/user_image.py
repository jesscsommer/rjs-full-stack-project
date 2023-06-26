from .__init__ import db

class UserImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    mimetiype = db.Column(db.String, nullable=False)
