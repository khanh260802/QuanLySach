import time
from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource, reqparse, fields, marshal_with
from app.services.book_service import *
from app.schemas.BookSchema import BookSchema
from pydantic import ValidationError

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

    
    def post(self):
        try:
            data = request.get_json()
            book_data = BookSchema(**data)  # Khởi tạo đối tượng từ lớp BookSchema
        except ValidationError as e:
            print(e.errors())
            return {'errors': e.errors()}, 400

        new_book = create_book(title=book_data.title, author=book_data.author, published_date=book_data.published_date)
        book_json = {
            'id': new_book.id,
            'title': new_book.title,
            'author': new_book.author,
            'published_date': new_book.published_date
        }
        return book_json, 201

# Resource cho một sách cụ thể
class BookResource(Resource):
    @marshal_with(book_fields)
    def get(self, book_id):
        book = get_book_by_id(book_id)
        if not book:
            return {'message': 'Book not found'}, 404
        return book

    # @marshal_with(book_fields)
    def put(self, book_id):
        book = get_book_by_id(book_id)
        if not book:
            return {'message': 'Book not found'}, 404
        
        try:
            data = request.get_json()
            book_data = BookSchema(**data)  # Khởi tạo đối tượng từ lớp BookSchema
        except ValidationError as e:
            print(e.errors())
            return {'errors': e.errors()}, 400
        
        update_book(book, title=book_data.title, author=book_data.author, published_date=book_data.published_date)
        book_json = {
            'id': book_id,
            'title': book_data.title,
            'author': book_data.author,
            'published_date': book_data.published_date
        }
        return book_json
    
    def delete(self, book_id):
        book = get_book_by_id(book_id)
        if not book:
            return {'message': 'Book not found'}, 404
        delete_book(book)
        return {'message': 'Book deleted'}, 200
    
api.add_resource(BookListResource, '/books')
api.add_resource(BookResource, '/books/<int:book_id>')