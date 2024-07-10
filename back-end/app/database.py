import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask

# Initialize SQLAlchemy object
db = SQLAlchemy()
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@127.0.0.1:3306/bookStore'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# helloworld