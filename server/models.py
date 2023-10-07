from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime, func , Enum
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


class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    products = db.relationship('Product', backref='category', lazy=True)

    def __init__(self, name):
        self.name = name

    serialize_rules = ('-products.category',)  # Exclude the 'products' relationship's 'category' sub-relationship



class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String)
    title = db.Column(db.String)
    star = db.Column(db.String)
    reviews = db.Column(db.String)
    prevPrice = db.Column(db.String)
    newPrice = db.Column(db.String)
    company = db.Column(db.String)
    color = db.Column(db.String)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    def __init__(self, img, title, star, reviews, prevPrice, newPrice, company, color, category):
        self.img = img
        self.title = title
        self.star = star
        self.reviews = reviews
        self.prevPrice = prevPrice
        self.newPrice = newPrice
        self.company = company
        self.color = color
        self.category = category

    serialize_rules = ('-category.products',)  # Exclude the 'category' relationship's 'products' sub-relationship
