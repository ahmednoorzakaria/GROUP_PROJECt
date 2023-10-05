from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime, func
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash


db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    _tablename_ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20) , unique = True , nullable = False)
    email = db.Column(db.String(120) , unique = True , nullable = False)
    password = db.Column(db.String(60) , nullable = False)
    created_at = db.Column(DateTime, default=func.now())
    updated_at = db.Column(DateTime, onupdate=func.now())

    def _init_(self, username, email, password):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)