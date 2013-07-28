import flask
from flask.ext.testing import TestCase

from finish_him import app
from finish_him import db


class BooksTest(TestCase):

	def create_app(self):
		app.config['TESTING'] = True
		app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
		return app

	def setUp(self):
		db.create_all()

	def tearDown(self):
		db.session.remove()
		db.drop_all()

	def test_get_books_when_none_exists(self):
		self._get_books_and_verify_output_books([])

	def _get_books_and_verify_output_books(self, expected_books):
		response = self.client.get('/api/book')
		books_output = response.json['objects']
		self.assertEquals(books_output, expected_books)

	def test_create_and_get_books(self):
		book_info = {
			'title': 'title',
			'author': 'author',
			'description': 'description'
		}
		response = self.client.post(
			'/api/book',
			data=flask.json.dumps(book_info),
			content_type='application/json'
		)

		expected_book_info = book_info.copy()
		expected_book_info['id'] = response.json['id']
		self._get_books_and_verify_output_books([expected_book_info])
