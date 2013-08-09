import flask
from flask.ext.restless import APIManager

import models
from finish_him import app
from finish_him import db

manager = APIManager(app, flask_sqlalchemy_db=db)

manager.create_api(
	models.Book,
	methods=['GET', 'POST', 'DELETE', 'PUT'],
	results_per_page=20,
	exclude_columns=['user_books']
)

manager.create_api(
	models.User,
	methods=['GET', 'POST'],
	results_per_page=20,
)

@app.route('/')
def index():
	return flask.send_file('../../client/finish_him/app/index.html')
