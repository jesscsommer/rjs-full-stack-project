from .__init__ import db
from config import bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


user_following = db.Table(
    "user_following",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)

class User(db.Model):
    __tablename__="users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    name = db.Column(db.String, nullable=True)
    bio = db.Column(db.String, nullable=True)
    profile_pic_num = db.Column(db.Integer)
    public_acct = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    # relationships
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")
    post_likes = db.relationship("PostLike", back_populates="user", cascade="all, delete-orphan")
    comment_likes = db.relationship("CommentLike", back_populates="user", cascade="all, delete-orphan")

    following = db.relationship(
        "User", lambda: user_following,
        primaryjoin=lambda: User.id == user_following.c.follower_id, 
        secondaryjoin=lambda: User.id == user_following.c.followed_id,
        backref = "followers"
    )
    
    def __repr__(self):
        return f"User #{self.id}: {self.username}"
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, 
                                            password.encode('utf-8'))