from flask.ext.restless import APIManager

import models
from finish_him import app
from finish_him import db

manager = APIManager(app, flask_sqlalchemy_db=db)

manager.create_api(
	models.Book,
	methods=['GET', 'POST', 'DELETE', 'PUT'],
	results_per_page=20
)
