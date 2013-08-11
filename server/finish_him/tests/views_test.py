import flask
from flask.ext.testing import TestCase

from finish_him import app
from finish_him import db
from finish_him import models


class IntegrationTestCase(TestCase):

	def create_app(self):
		app.config['TESTING'] = True
		app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
		return app

	def setUp(self):
		db.create_all()

	def tearDown(self):
		db.session.remove()
		db.drop_all()


class BookTestCase(IntegrationTestCase):

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
			'description': 'description',
			'isbn': 'isbn'
		}
		response = self.client.post(
			'/api/book',
			data=flask.json.dumps(book_info),
			content_type='application/json'
		)

		expected_book_info = book_info.copy()
		expected_book_info['id'] = response.json['id']
		self._get_books_and_verify_output_books([expected_book_info])


class UserTestCase(IntegrationTestCase):

	def setUp(self):
		super(UserTestCase, self).setUp()
		self.user = models.User(
			email='email@finish_him.com',
			first_name='First',
			last_name='Last'
		)
		self.book = models.Book(
			title='title',
			author='author',
			description='description'
		)
		user_book = models.UserBook(book=self.book)
		self.user.user_books.append(user_book)
		db.session.add(self.user)
		db.session.commit()


	def test_get_books_for_user(self):
		response = self.client.get('/api/user/%s' % self.user.id)

		self.assertEquals(
			response.json,
			{
				'id': self.user.id,
				'email': self.user.email,
				'first_name': self.user.first_name,
				'last_name': self.user.last_name,
				'user_books': [
					{
						'book_id': self.book.id,
						'user_id': self.user.id,
					}
				]
			}
		)

	def test_get_all_users(self):
		response = self.client.get('/api/user')
		self.assertEquals(len(response.json['objects']), 1)
