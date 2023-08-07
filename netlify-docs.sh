#!/usr/bin/env bash

pip install pipenv
pipenv install --dev
pip install -r requirements.txt 
npm install --prefix client
npm run build --prefix client