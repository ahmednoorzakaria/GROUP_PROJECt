from flask import Flask, make_response,jsonify,request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.security import check_password_hash,generate_password_hash
import re 




from models import db, User,Product,Category

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)




@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Check if a user with the provided email exists in the database
    user = User.query.filter_by(email=email).first()
    
    if user and check_password_hash(user.password, password):
        return jsonify({'message': 'Logged in successfully.'}), 200
    else:
        return jsonify({'message': 'Wrong credentials'}), 401




@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if the username or email already exists in the database
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists.'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists.'}), 400
    
    # Validate the password using regex
    password_regex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'
    if not re.match(password_regex, password):
        return jsonify({'message': 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.'}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)
    # Create a new user with the hashed password
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully.'}), 201


@app.route('/products', methods=['GET'])
def get_products():
    # Query all products from the database
    products = Product.query.all()

    # Serialize the products to JSON using the SerializerMixin
    serialized_products = [product.to_dict() for product in products]

    return jsonify(serialized_products)
@app.route("/api/products/<category>")
def get_products_by_category(category):
    try:
        # Fetch products from the database by category
        input_value=None
        if category =="shirts":
            input_value =1
        elif category =="trousers":
            input_value =2
        elif category =="dresses":
            input_value =3
        elif category =="tops":
            input_value=4
        elif category =="underwear":
            input_value =  5
        elif category =="shoes":
            input_value =6







        products = Product.query.filter_by(category_id=input_value).all()
        # Serialize the products into a JSON response

        product_list =[product.to_dict() for product in products]

        response=make_response(jsonify(product_list),200)
        return response

        

        # serialized_products = [product.serialize() for product in products]
        # return jsonify(products=serialized_products)
    except Exception as e:
        return jsonify(error=str(e)), 500
 #
 # kimemia added another endpoint for the category endpoint 
@app.route("/category/<name>",methods=['GET'])
def getter(name):
    category=Category.query.get(name)
    response=make_response( jsonify(category.serialize()),200)
    print(response)
    return response

 

       
if __name__ == "__main__":
    # Run the Flask app on port 5555
    app.run(host="0.0.0.0", port=5555)
