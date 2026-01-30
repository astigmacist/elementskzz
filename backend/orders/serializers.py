from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem, Wishlist
from products.serializers import ProductListSerializer


class CartItemSerializer(serializers.ModelSerializer):
    """Сериализатор товара в корзине"""
    
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity', 'total_price', 'created_at']
        read_only_fields = ['id', 'created_at']


class CartSerializer(serializers.ModelSerializer):
    """Сериализатор корзины"""
    
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_items = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price', 'total_items', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class OrderItemSerializer(serializers.ModelSerializer):
    """Сериализатор товара в заказе"""
    
    class Meta:
        model = OrderItem
        fields = [
            'id', 'product_name', 'product_sku',
            'price', 'quantity', 'total_price'
        ]
        read_only_fields = ['id', 'total_price']


class OrderSerializer(serializers.ModelSerializer):
    """Сериализатор заказа"""
    
    items = OrderItemSerializer(many=True, read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'user_email',
            'status', 'status_display',
            'first_name', 'last_name', 'email', 'phone',
            'city', 'address', 'postal_code',
            'payment_method', 'is_paid',
            'subtotal', 'delivery_cost', 'total',
            'notes', 'items',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'order_number', 'user', 'created_at', 'updated_at']


class OrderCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания заказа"""
    
    class Meta:
        model = Order
        fields = [
            'first_name', 'last_name', 'email', 'phone',
            'city', 'address', 'postal_code',
            'payment_method', 'notes'
        ]
    
    def create(self, validated_data):
        user = self.context['request'].user
        cart = Cart.objects.get(user=user)
        
        if not cart.items.exists():
            raise serializers.ValidationError("Корзина пуста")
        
        # Вычисляем стоимость
        subtotal = cart.total_price
        delivery_cost = 0  # Можно добавить логику расчета доставки
        total = subtotal + delivery_cost
        
        # Создаем заказ
        order = Order.objects.create(
            user=user,
            subtotal=subtotal,
            delivery_cost=delivery_cost,
            total=total,
            **validated_data
        )
        
        # Копируем товары из корзины в заказ
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                product_name=cart_item.product.name,
                product_sku=cart_item.product.sku,
                price=cart_item.product.price,
                quantity=cart_item.quantity
            )
        
        # Очищаем корзину
        cart.items.all().delete()
        
        return order


class WishlistSerializer(serializers.ModelSerializer):
    """Сериализатор избранного"""
    
    products = ProductListSerializer(many=True, read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ['id', 'products', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

