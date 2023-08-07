#!/usr/bin/env bash

pip install pipenv
pipenv install --dev
npm install --prefix client
npm run build --prefix client