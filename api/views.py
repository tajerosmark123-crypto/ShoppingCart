from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, Cart, CartItem, Order
from .serializers import ProductSerializer, CartSerializer, CartItemSerializer, OrderSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        cart = self.get_object()
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cart=cart)
            return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def checkout(self, request, pk=None):
        cart = self.get_object()
        if not cart.items.exists():
            return Response({"detail": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Collect calculated totals
        cart_data = self.get_serializer(cart).data
        
        # Check if order already exists for this cart
        if hasattr(cart, 'order') and cart.order is not None:
            return Response({"detail": "Order already created for this cart", "order_id": cart.order.id}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            cart=cart,
            subtotal=cart_data['subtotal'],
            tax=cart_data['tax'],
            shipping=cart_data['shipping'],
            total=cart_data['total'],
            status='pending'
        )
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
