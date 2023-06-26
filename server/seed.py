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
        users = []
        usernames = []
        
        for _ in range(15):
            username = fake.first_name()
            while username in usernames: 
                username = fake.first_name()
            usernames.append(username)

            user = User(
                username=username,
                name=fake.name(),
                bio=fake.paragraph(),
                public_acct=rc([True, False]),
            )
            # user.password_hash = user.username + "password"
            users.append(user)
            for _ in range(3):
                user.followers.append(rc(users))
    
        db.session.add_all(users)

        print("Creating posts ...")
        posts = []

        for _ in range(30):
            post = Post(
                content=fake.paragraph(),
                user=rc(users)
            )
            posts.append(post)

        db.session.add_all(posts)

        print("Creating comments ...")
        comments = []

        for _ in range(50):
            comment = Comment(
                content=fake.paragraph(),
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
