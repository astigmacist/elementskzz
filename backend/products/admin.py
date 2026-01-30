from django.contrib import admin
from .models import Category, Brand, Product, ProductImage, ProductSpecification, Review


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductSpecificationInline(admin.TabularInline):
    model = ProductSpecification
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'parent', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'parent', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_active', 'order']


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_active']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'category', 'brand', 'price', 'old_price',
        'discount_percentage', 'stock', 'is_available',
        'is_new', 'is_featured', 'rating', 'created_at'
    ]
    list_filter = [
        'category', 'brand', 'is_available', 'is_new',
        'is_featured', 'is_active', 'created_at'
    ]
    search_fields = ['name', 'description', 'sku']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['price', 'stock', 'is_available', 'is_new', 'is_featured']
    inlines = [ProductImageInline, ProductSpecificationInline]
    readonly_fields = ['views_count', 'rating', 'reviews_count', 'discount_percentage']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'slug', 'category', 'brand', 'sku')
        }),
        ('Описание', {
            'fields': ('short_description', 'description')
        }),
        ('Цены и скидки', {
            'fields': ('price', 'old_price', 'discount_percentage')
        }),
        ('Наличие', {
            'fields': ('stock', 'is_available')
        }),
        ('Изображение', {
            'fields': ('main_image',)
        }),
        ('Рейтинг', {
            'fields': ('rating', 'reviews_count', 'views_count')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Флаги', {
            'fields': ('is_new', 'is_featured', 'is_active')
        }),
    )


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'order', 'created_at']
    list_filter = ['created_at']
    search_fields = ['product__name']


@admin.register(ProductSpecification)
class ProductSpecificationAdmin(admin.ModelAdmin):
    list_display = ['product', 'name', 'value', 'order']
    list_filter = ['name']
    search_fields = ['product__name', 'name', 'value']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'user', 'rating', 'is_approved', 'created_at']
    list_filter = ['rating', 'is_approved', 'created_at']
    search_fields = ['product__name', 'user__email', 'comment']
    list_editable = ['is_approved']
    readonly_fields = ['created_at']

