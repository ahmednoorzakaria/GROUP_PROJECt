from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime, func
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash


db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    created_at = db.Column(DateTime, default=func.now())
    updated_at = db.Column(DateTime, onupdate=func.now())

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)

class Playlist (db.model,SerializerMixin):
    __tablename__ = "playlists"
    