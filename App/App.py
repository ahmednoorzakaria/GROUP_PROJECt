from flask import Flask, make_response,jsonify,request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.security import check_password_hash


from .models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)


app = Flask(__name__)

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    # Validate the data here...
    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return "User created!"

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        return "Logged in!"
    else:
        return "Wrong credentials!"


if __name__ == '__main__':
    app.run(port=5555)