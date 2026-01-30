from rest_framework import serializers
from .models import Category, Brand, Product, ProductImage, ProductSpecification, Review


class CategorySerializer(serializers.ModelSerializer):
    """Сериализатор категории"""
    
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'image',
            'parent', 'children', 'is_active', 'order'
        ]
    
    def get_children(self, obj):
        if obj.children.exists():
            return CategorySerializer(obj.children.filter(is_active=True), many=True).data
        return []


class BrandSerializer(serializers.ModelSerializer):
    """Сериализатор бренда"""
    
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'logo', 'description']


class ProductImageSerializer(serializers.ModelSerializer):
    """Сериализатор изображений товара"""
    
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'order']


class ProductSpecificationSerializer(serializers.ModelSerializer):
    """Сериализатор характеристик товара"""
    
    class Meta:
        model = ProductSpecification
        fields = ['id', 'name', 'value', 'order']


class ReviewSerializer(serializers.ModelSerializer):
    """Сериализатор отзывов"""
    
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Review
        fields = [
            'id', 'user', 'user_name', 'user_email', 'rating',
            'comment', 'advantages', 'disadvantages',
            'is_approved', 'created_at'
        ]
        read_only_fields = ['user', 'is_approved', 'created_at']


class ProductListSerializer(serializers.ModelSerializer):
    """Сериализатор для списка товаров"""
    
    category_name = serializers.CharField(source='category.name', read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'category_name',
            'brand', 'brand_name', 'short_description',
            'price', 'old_price', 'discount_percentage',
            'main_image', 'rating', 'reviews_count',
            'is_new', 'is_featured', 'is_available'
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    """Сериализатор для детальной информации о товаре"""
    
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    specifications = ProductSpecificationSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'brand',
            'description', 'short_description',
            'price', 'old_price', 'discount_percentage',
            'sku', 'stock', 'is_available',
            'main_image', 'images',
            'rating', 'reviews_count', 'reviews',
            'specifications',
            'is_new', 'is_featured',
            'views_count', 'created_at', 'updated_at'
        ]

