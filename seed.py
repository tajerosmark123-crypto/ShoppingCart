import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import Product, ProductAttribute

Product.objects.all().delete()

# 1. Graduation Package
p1 = Product.objects.create(
    name="The Ultimate Graduation Package", 
    base_price=2499.00, 
    image_url="https://images.unsplash.com/photo-1523050853051-f75dbba8e3c1?q=80&w=1000"
)
ProductAttribute.objects.create(product=p1, name="Gown Size", options=["S", "M", "L", "XL", "XXL"])
ProductAttribute.objects.create(product=p1, name="Cap Size", options=["Standard", "Large"])
ProductAttribute.objects.create(product=p1, name="Tassel Color", options=["Royal Blue/Gold", "Red/Black", "Solid Gold"])

# 2. Honors Stole
p2 = Product.objects.create(
    name="Academic Honors Stole", 
    base_price=450.00, 
    image_url="https://images.unsplash.com/photo-1541178735423-47ce499961ee?q=80&w=1000"
)

# 3. Diploma Frame
p3 = Product.objects.create(
    name="Executive Diploma Frame", 
    base_price=1250.00, 
    image_url="https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=1000"
)

# 4. Premium Gown
p4 = Product.objects.create(
    name="Premium Doctoral Gown", 
    base_price=3500.00, 
    image_url="https://images.unsplash.com/photo-1505663912202-ac22d4cb3707?q=80&w=1000"
)

# 5. Graduation Cap
p5 = Product.objects.create(
    name="Classic Mortarboard Cap", 
    base_price=350.00, 
    image_url="https://images.unsplash.com/photo-1590013330462-0761358d39e2?q=80&w=1000"
)

# 6. Announcement Set
p6 = Product.objects.create(
    name="Premium Announcement Set (25pcs)", 
    base_price=950.00, 
    image_url="https://images.unsplash.com/photo-1606208427954-aa8319c4815e?q=80&w=1000"
)

# 7. Commemorative Medal
p7 = Product.objects.create(
    name="Legacy Commemorative Medal", 
    base_price=550.00, 
    image_url="https://images.unsplash.com/photo-1611090597336-6214f4e70e9a?q=80&w=1000"
)

# 8. Yearbook Pre-order
p8 = Product.objects.create(
    name="2026 Batch Yearbook", 
    base_price=1850.00, 
    image_url="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000"
)

# 9. Alumni T-Shirt
p9 = Product.objects.create(
    name="Official Alumni Tee", 
    base_price=450.00, 
    image_url="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000"
)

# 10. Graduation Bouquet
p10 = Product.objects.create(
    name="Celebration Flower Bouquet", 
    base_price=750.00, 
    image_url="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1000"
)

print("Database successfully seeded with 10 premium graduation items.")
