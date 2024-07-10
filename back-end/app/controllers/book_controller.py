from flask import Blueprint
from flask_restful import Api, Resource, reqparse, fields, marshal_with
from app.services.book_service import *

book_bp = Blueprint('book_bp', __name__)
api = Api(book_bp)

book_fields = {
    'id': fields.Integer,
    'title': fields.String,
    'author': fields.String,
    'published_date': fields.String,
}

# Resource cho danh sách sách
class BookListResource(Resource):
    @marshal_with(book_fields)
    def get(self):
        books = get_all_books()
        return books

    @marshal_with(book_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str, required=True, help='Title cannot be blank')
        parser.add_argument('author', type=str, required=True, help='Author cannot be blank')
        parser.add_argument('published_date', type=str)
        args = parser.parse_args()

        new_book = create_book(title=args['title'], author=args['author'], published_date=args['published_date'])
        return new_book, 201

# Resource cho một sách cụ thể
class BookResource(Resource):
    @marshal_with(book_fields)
    def get(self, book_id):
        book = get_book_by_id(book_id)
        if not book:
            return {'message': 'Book not found'}, 404
        return book

    @marshal_with(book_fields)
    def put(self, book_id):
        book = get_book_by_id(book_id)
        if not book:
            return {'message': 'Book not found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str)
        parser.add_argument('author', type=str)
        parser.add_argument('published_date', type=str)
        args = parser.parse_args()

        update_book(book, title=args.get('title'), author=args.get('author'), published_date=args.get('published_date'))
        return book
    
    def delete(self, book_id):
        book = get_book_by_id(book_id)
        if not book:
            return {'message': 'Book not found'}, 404

        delete_book(book)
        return {'message': 'Book deleted'}, 200
    
api.add_resource(BookListResource, '/books')
api.add_resource(BookResource, '/books/<int:book_id>')