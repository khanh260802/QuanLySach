# app/services/book_service.py
from app import db
from app.models.books import Book

def create_book(title, author, published_date=None):
    new_book = Book(title=title, author=author, published_date=published_date)
    db.session.add(new_book)
    db.session.commit()
    return new_book

def get_all_books():
    return Book.query.all()

def get_book_by_id(book_id):
    return Book.query.get(book_id)

def update_book(book, title=None, author=None, published_date=None):
    if title:
        book.title = title
    if author:
        book.author = author
    if published_date:
        book.published_date = published_date
    db.session.commit()

def delete_book(book):
    db.session.delete(book)
    db.session.commit()
