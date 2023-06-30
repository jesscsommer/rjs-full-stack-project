# Haiku Haven
This social network for haikus has a React frontend and a Python with Flask backend. These instructions will help you through set up. Visit [this README](/client/README.md) for a walkthrough of the app's features. 

***

## Installation

1. Fork and clone this repo from Github to your local environment
2. Navigate into your local directory and open the contents in your preferred code editor
3. Run `pipenv install` to install dependencies 
4. Run `pipenv shell` to create virtual environment
5. From the main project directory, run `cd server` to enter the server directory 

### .env set up
6. Create `.env` file in the server directory with `touch .env`
7. Add a line for `SECRET_KEY=`
8. In your terminal, run `python -c 'import secrets; print(secrets.token_hex())` to generate your own key
9. Copy the result into the `.env` file as the value for the secret key
10. Make sure `.env` is added to your `.gitignore`

### Starting the server 
11. Run `python seed.py` to seed the database
12. Run `python app.py` to start the server 

### Starting the client
13. In another terminal, `cd` into the client directory
14. Run `npm install` to install dependencies 
15. Run `npm start` to open the app in the browser


## Licensing
MIT License
Copyright (c) 2023 

[Ren Blake](https://github.com/rcblake) <br>
[Jess Sommerville](https://github.com/jesscsommer) <br>[Shiyao Zhai](https://github.com/RRZhai)

