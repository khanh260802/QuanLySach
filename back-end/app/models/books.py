from app.database import db, app

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    published_date = db.Column(db.String(20))

    def __repr__(self):
        return f'<Book {self.title}>'
    
# tạo bảng    
with app.app_context():
    db.create_all()