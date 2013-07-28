from flask.ext.testing import TestCase

from finish_him import app
from finish_him import db
from finish_him import models


class GetBooksTest(TestCase):

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
		response = self.client.get('/')
		self.assertEquals(response.json, {'books': expected_books})

	def test_get_books_when_books_exist(self):
		book_info = {
			'title': 'title',
			'author': 'author',
			'description': 'description'
		}
		book = models.Book(**book_info)
		db.session.add(book)
		db.session.commit()

		self._get_books_and_verify_output_books([book_info])
