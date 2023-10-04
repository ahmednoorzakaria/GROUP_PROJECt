from flask import Flask, make_response,jsonify,request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.security import check_password_hash
import re 


from Models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)





@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        return "Logged in!"
    else:
        return "Wrong credentials!"



@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Perform additional validations here, such as checking password strength using regex
    strong_password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
    if not re.match(strong_password_regex, password):
        return jsonify({'message': 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'}), 400

    # Check if the username or email already exists in the database
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists.'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists.'}), 400

    # Create a new user
    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully.'}), 201


if __name__ == '__main__':
    app.run(port=5555)