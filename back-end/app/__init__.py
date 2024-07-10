from flask_migrate import Migrate
from flask_restful import Api
from app.database import db, app
from flask_cors import CORS
CORS(app)
db.init_app(app)
api = Api(app)
migrate = Migrate(app, db)

# Import các routes
from app.controllers.book_controller import book_bp
app.register_blueprint(book_bp)