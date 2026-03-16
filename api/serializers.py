from rest_framework import serializers
from .models import Product, ProductAttribute, Cart, CartItem, Order

class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ['id', 'name', 'options']

class ProductSerializer(serializers.ModelSerializer):
    attributes = ProductAttributeSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'base_price', 'image_url', 'attributes']

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'product_id', 'selected_attributes', 'quantity', 'price']
        extra_kwargs = {'cart': {'read_only': True}} # Allow creating without passing cart directly if view handles it

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    subtotal = serializers.SerializerMethodField()
    tax = serializers.SerializerMethodField()
    shipping = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'subtotal', 'tax', 'shipping', 'total', 'created_at']

    def get_subtotal(self, obj):
        return sum(item.price for item in obj.items.all())

    def get_tax(self, obj):
        return round(float(self.get_subtotal(obj)) * 0.07, 2) # Example 7% tax

    def get_shipping(self, obj):
        return 15.00 if obj.items.exists() else 0.00 # Flat shipping

    def get_total(self, obj):
        return float(self.get_subtotal(obj)) + self.get_tax(obj) + self.get_shipping(obj)

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
