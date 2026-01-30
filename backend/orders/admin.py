from django.contrib import admin
from .models import Cart, CartItem, Order, OrderItem, Wishlist


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = ['total_price']


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_items', 'total_price', 'created_at']
    search_fields = ['user__email', 'user__first_name', 'user__last_name']
    readonly_fields = ['total_items', 'total_price', 'created_at', 'updated_at']
    inlines = [CartItemInline]


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity', 'total_price', 'created_at']
    list_filter = ['created_at']
    search_fields = ['cart__user__email', 'product__name']
    readonly_fields = ['total_price']


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['total_price']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'order_number', 'user', 'status', 'payment_method',
        'is_paid', 'total', 'created_at'
    ]
    list_filter = ['status', 'payment_method', 'is_paid', 'created_at']
    search_fields = [
        'order_number', 'user__email', 'first_name',
        'last_name', 'phone', 'email'
    ]
    readonly_fields = ['order_number', 'created_at', 'updated_at']
    list_editable = ['status', 'is_paid']
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Информация о заказе', {
            'fields': ('order_number', 'user', 'status', 'created_at', 'updated_at')
        }),
        ('Контактная информация', {
            'fields': ('first_name', 'last_name', 'email', 'phone')
        }),
        ('Адрес доставки', {
            'fields': ('city', 'address', 'postal_code')
        }),
        ('Оплата', {
            'fields': ('payment_method', 'is_paid', 'subtotal', 'delivery_cost', 'total')
        }),
        ('Примечания', {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
    )


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product_name', 'product_sku', 'price', 'quantity', 'total_price']
    list_filter = ['order__status']
    search_fields = ['order__order_number', 'product_name', 'product_sku']
    readonly_fields = ['total_price']


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'products_count', 'created_at']
    search_fields = ['user__email', 'user__first_name', 'user__last_name']
    filter_horizontal = ['products']
    
    def products_count(self, obj):
        return obj.products.count()
    products_count.short_description = 'Количество товаров'

