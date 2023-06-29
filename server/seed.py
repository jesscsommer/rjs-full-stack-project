#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

from models.comment_like import CommentLike
from models.comment import Comment
from models.post_like import PostLike
from models.post import Post
from models.user import User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting all records ...")

        User.query.delete()
        Post.query.delete()
        Comment.query.delete()
        PostLike.query.delete()
        CommentLike.query.delete()

        print("Creating users ...")
        u1 = User(
            username="ren123",
            name="Ren",
            public_acct=True
        )

        u2 = User(
            username="shiyao456",
            name="Shiyao",
            public_acct=True
        )

        u3 = User(
            username="jess789",
            name="Jess",
            bio="haikus from grey haze \n from pacific northwest rain \n and coffee pools, drink",
            public_acct=True
        )

        users = [u1, u2, u3]
        db.session.add_all(users)

        print("Creating posts ...")
        
        five_syllables = ["why don't we ever", "softer than morning", 
                        "haunted by syntax", "haiku not found yet",
                        "worn out confetti", "ear drums still ringing",
                        "vermillion sea", "still a bad request"]
        
        seven_syllables = ["why, is the bus still running?", 
                        "cotton candy at the fair",
                        "the ocean keeps its secrets",
                        "tree bark – debugger was here",
                        'the west sings, "json derulo"'
                        ]
        
        posts = []

        for _ in range(100):
            post = Post(
                    content=" \n".join([rc(five_syllables), 
                                        rc(seven_syllables), rc(five_syllables)]),
                    user=rc(users)
                )
            posts.append(post)

        db.session.add_all(posts)

        print("Creating comments ...")
        comments = []

        comment_content = ["Amazing haiku!", "Could be better",
                        "I read a haiku similar to this last year",
                        "Where can I read more haikus like this?",
                        "Check out my profile, I post every day"]

        for _ in range(25):
            comment = Comment(
                content=rc(comment_content),
                post=rc(posts),
                user=rc(users)
            )
            comments.append(comment)

        db.session.add_all(comments)

        print("Creating likes for posts ...")
        post_likes = []

        for _ in range(100):
            post_like = PostLike(
                post=rc(posts),
                user=rc(users)
            )
            post_likes.append(post_like)

        db.session.add_all(post_likes)

        print("Creating likes for comments ...")
        comment_likes = []

        for _ in range(100):
            comment_like = CommentLike(
                comment=rc(comments),
                user=rc(users)
            )
            comment_likes.append(comment_like)

        db.session.add_all(comment_likes)

        print("Committing to db ...")

        db.session.commit()
        
        print("Complete")
