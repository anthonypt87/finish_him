from finish_him import app
from flask import jsonify

import models


@app.route('/')
def get_book():
	books = models.Book.query.all()
	json_books = _convert_books_to_json(books)
	return jsonify(books=json_books)

def _convert_books_to_json(books):
	return [
		{
			'title': book.title,
			'author': book.author,
			'description': book.description,
		} for book in books
	]
