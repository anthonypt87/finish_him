import os

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

static_folder_path = os.path.abspath('../client/finish_him/app/')

app = Flask(__name__, static_folder=static_folder_path, static_url_path='')
db = SQLAlchemy(app)

import views
