from finish_him import db


class Book(db.Model):

	__tablename__ = 'book'

	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	title = db.Column(db.String)
	author = db.Column(db.String)
	description = db.Column(db.BLOB)

	user_books = db.relationship('UserBook', backref='book')


class User(db.Model):

	__tablename__ = 'user'

	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	email = db.Column(db.String)
	first_name = db.Column(db.String)
	last_name = db.Column(db.BLOB)

	user_books = db.relationship('UserBook', backref='user')


class UserBook(db.Model):

	__tablename__ = 'user_book'

	book_id = db.Column(
		db.Integer,
		db.ForeignKey('book.id'),
		primary_key=True
	)
	user_id = db.Column(
		db.Integer,
		db.ForeignKey('user.id'),
		primary_key=True
	)
