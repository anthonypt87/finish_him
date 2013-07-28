from finish_him import db


class Book(db.Model):

	__tablename__ = 'book'
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	title = db.Column(db.Integer)
	author = db.Column(db.Integer)
	description = db.Column(db.BLOB)
