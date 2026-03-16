import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import Product, ProductAttribute

Product.objects.all().delete()

p1 = Product.objects.create(name="The Ultimate Graduation Package", base_price=249.99, image_url="https://placehold.co/150x150?text=Grad+Pkg")
ProductAttribute.objects.create(product=p1, name="Gown Size", options=["S", "M", "L", "XL", "XXL"])
ProductAttribute.objects.create(product=p1, name="Cap Size", options=["Standard", "Large"])
ProductAttribute.objects.create(product=p1, name="Tassel Color", options=["Royal Blue/Gold", "Red/Black", "Solid Gold"])

p2 = Product.objects.create(name="Custom Diploma Frame (Executive Style)", base_price=85.00, image_url="https://placehold.co/150x150?text=Frame")
p3 = Product.objects.create(name="Graduation Announcement Cards (Set of 25)", base_price=45.00, image_url="https://placehold.co/150x150?text=Cards")

print("Database seeded with products from the mockup.")
