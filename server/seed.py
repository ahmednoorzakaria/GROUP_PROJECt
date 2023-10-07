from app import app, db
from models import Category, Product
from faker import Faker
from dataset import category_data



fake = Faker()

# Define the category-image mapping
category_images = {
    'shirts': 'shirt.jpg',
    'trousers': 'trousers.jpg',
    'dresses': 'dress.jpg',
    'tops': 'top.jpg',
    'underwear': 'underwear.jpg',
    'shoes': 'shoes.jpg',
}

# Create and seed data for the Category and Product models
def seed_data():
    Category.query.delete()
    Product.query.delete()
    categories = []
    for i in range(len(category_data)):
        
        category_name = categories.append(category_data[i]['name'])
        db.session.add(category_name)
        db.session.commit()
       

    print("Data has been properly seeded.")
    
   

# Call the seed_data function to create and seed the data


if __name__ == '__main__':
    with app.app_context():
        seed_data()
