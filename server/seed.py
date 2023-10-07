from app import app, db
from models import Category, Product
from faker import Faker
from dataset import category_data

fake = Faker()

# Create and seed data for the Category and Product models
def seed_data():
    db.create_all()  # Create database tables if they don't exist

    for category_info in category_data:
        category_name = category_info['name']

        new_category = Category(name=category_name)
        db.session.add(new_category)
        db.session.commit()

        for product_info in category_info['products']:
            title = product_info['title']
            star = product_info['star']
            reviews = product_info['reviews']
            prev_price = product_info['prevPrice']
            new_price = product_info['newPrice']
            company = product_info['company']
            color = product_info['color']
            product_image = product_info['img']  # Get the product image data

            new_product = Product(
                title=title,
                star=star,
                reviews=reviews,
                prevPrice=prev_price,
                newPrice=new_price,
                company=company,
                color=color,
                category=new_category,  # Link the product to its category
                img=product_image  # Set the product image
            )
            db.session.add(new_product)
            db.session.commit()

    print("Data has been properly seeded.")

if __name__ == '__main__':
    with app.app_context():
        seed_data()
