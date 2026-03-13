from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Brand, Product, Review
from .serializers import (
    CategorySerializer, BrandSerializer,
    ProductListSerializer, ProductDetailSerializer,
    ProductAdminSerializer,
    ReviewSerializer
)


class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet для категорий — публичное чтение, запись только для админа"""

    queryset = Category.objects.all().order_by('order', 'name')
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]

    def get_queryset(self):
        qs = super().get_queryset()
        # Публичные запросы (не admin) видят только активные и корневые
        if self.request.user and self.request.user.is_staff:
            return qs
        return qs.filter(is_active=True)


class BrandViewSet(viewsets.ModelViewSet):
    """ViewSet для брендов — публичное чтение, запись только для админа"""

    queryset = Brand.objects.all().order_by('name')
    serializer_class = BrandSerializer
    lookup_field = 'slug'
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user and self.request.user.is_staff:
            return qs
        return qs.filter(is_active=True)


class ProductViewSet(viewsets.ModelViewSet):
    """ViewSet для товаров — публичное чтение, CRUD только для админа"""

    queryset = Product.objects.all().select_related('category', 'brand')
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'brand', 'is_new', 'is_featured', 'is_available', 'is_active']
    search_fields = ['name', 'description', 'short_description', 'sku']
    ordering_fields = ['price', 'rating', 'created_at', 'views_count', 'stock', 'name']
    ordering = ['-created_at']
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'featured', 'new_arrivals', 'deals']:
            return [AllowAny()]
        return [IsAdminUser()]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProductAdminSerializer
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        # Публика видит только активные товары
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(is_active=True)

        # Фильтр по слагу категории
        category_slug = self.request.query_params.get('category__slug')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)

        # Фильтры по цене
        price_min = self.request.query_params.get('price_min')
        price_max = self.request.query_params.get('price_max')
        if price_min:
            qs = qs.filter(price__gte=price_min)
        if price_max:
            qs = qs.filter(price__lte=price_max)

        return qs

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Увеличиваем счётчик просмотров только для публичных запросов
        if not (request.user and request.user.is_staff):
            instance.views_count += 1
            instance.save(update_fields=['views_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Получить популярные товары"""
        products = self.get_queryset().filter(is_featured=True)[:12]
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def new_arrivals(self, request):
        """Получить новинки"""
        products = self.get_queryset().filter(is_new=True)[:12]
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def deals(self, request):
        """Получить товары со скидкой"""
        products = self.get_queryset().filter(
            discount_percentage__gt=0
        ).order_by('-discount_percentage')[:12]
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)


class ReviewViewSet(viewsets.ModelViewSet):
    """ViewSet для отзывов"""

    queryset = Review.objects.all().select_related('user')
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['product', 'is_approved']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        # Публика видит только одобренные
        if not (self.request.user and self.request.user.is_staff):
            queryset = queryset.filter(is_approved=True)
        product_id = self.request.query_params.get('product_id')
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        return queryset

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        if self.action == 'create':
            return [IsAuthenticated()]
        if self.action in ['update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [IsAdminUser()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
