#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api

#TODO: import models
from models import User, Recipe

#TODO: blueprint imports 
from blueprints.posts import Posts

#TODO: add resources to API
api.add_resource(Posts, "/posts")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
