from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """Модель категории товаров"""
    
    name = models.CharField('Название', max_length=200)
    slug = models.SlugField('Slug', max_length=200, unique=True, blank=True)
    description = models.TextField('Описание', blank=True)
    image = models.ImageField('Изображение', upload_to='categories/', blank=True, null=True)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='children',
        blank=True,
        null=True,
        verbose_name='Родительская категория'
    )
    is_active = models.BooleanField('Активна', default=True)
    order = models.IntegerField('Порядок', default=0)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Brand(models.Model):
    """Модель бренда"""
    
    name = models.CharField('Название', max_length=100)
    slug = models.SlugField('Slug', max_length=100, unique=True, blank=True)
    logo = models.ImageField('Логотип', upload_to='brands/', blank=True, null=True)
    description = models.TextField('Описание', blank=True)
    is_active = models.BooleanField('Активен', default=True)
    
    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(models.Model):
    """Модель товара"""
    
    name = models.CharField('Название', max_length=300)
    slug = models.SlugField('Slug', max_length=300, unique=True, blank=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        related_name='products',
        null=True,
        verbose_name='Категория'
    )
    brand = models.ForeignKey(
        Brand,
        on_delete=models.SET_NULL,
        related_name='products',
        null=True,
        blank=True,
        verbose_name='Бренд'
    )
    
    description = models.TextField('Описание')
    short_description = models.CharField('Краткое описание', max_length=500, blank=True)
    
    # Цены
    price = models.DecimalField('Цена', max_digits=10, decimal_places=2)
    old_price = models.DecimalField('Старая цена', max_digits=10, decimal_places=2, blank=True, null=True)
    discount_percentage = models.IntegerField('Процент скидки', default=0)
    
    # Характеристики
    sku = models.CharField('Артикул', max_length=100, unique=True, blank=True)
    stock = models.IntegerField('Количество на складе', default=0)
    is_available = models.BooleanField('В наличии', default=True)
    
    # Изображения
    main_image = models.ImageField('Главное изображение', upload_to='products/', blank=True, null=True)
    
    # Рейтинг и отзывы
    rating = models.DecimalField('Рейтинг', max_digits=3, decimal_places=2, default=0)
    reviews_count = models.IntegerField('Количество отзывов', default=0)
    
    # SEO
    meta_title = models.CharField('Meta Title', max_length=200, blank=True)
    meta_description = models.CharField('Meta Description', max_length=300, blank=True)
    
    # Флаги
    is_new = models.BooleanField('Новинка', default=False)
    is_featured = models.BooleanField('Популярный', default=False)
    is_active = models.BooleanField('Активен', default=True)
    
    views_count = models.IntegerField('Просмотры', default=0)
    
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)
    
    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['brand', 'is_active']),
        ]
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        
        # Вычисляем процент скидки
        if self.old_price and self.old_price > self.price:
            self.discount_percentage = int(((self.old_price - self.price) / self.old_price) * 100)
        else:
            self.discount_percentage = 0
        
        super().save(*args, **kwargs)


class ProductImage(models.Model):
    """Модель дополнительных изображений товара"""
    
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name='Товар'
    )
    image = models.ImageField('Изображение', upload_to='products/')
    order = models.IntegerField('Порядок', default=0)
    created_at = models.DateTimeField('Дата загрузки', auto_now_add=True)
    
    class Meta:
        verbose_name = 'Изображение товара'
        verbose_name_plural = 'Изображения товаров'
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"Изображение для {self.product.name}"


class ProductSpecification(models.Model):
    """Модель характеристик товара"""
    
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='specifications',
        verbose_name='Товар'
    )
    name = models.CharField('Название', max_length=200)
    value = models.CharField('Значение', max_length=500)
    order = models.IntegerField('Порядок', default=0)
    
    class Meta:
        verbose_name = 'Характеристика товара'
        verbose_name_plural = 'Характеристики товаров'
        ordering = ['order', 'name']
    
    def __str__(self):
        return f"{self.name}: {self.value}"


class Review(models.Model):
    """Модель отзыва на товар"""
    
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='reviews',
        verbose_name='Товар'
    )
    user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='reviews',
        verbose_name='Пользователь'
    )
    rating = models.IntegerField('Оценка', choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField('Комментарий')
    advantages = models.TextField('Достоинства', blank=True)
    disadvantages = models.TextField('Недостатки', blank=True)
    is_approved = models.BooleanField('Одобрен', default=False)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    
    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
        ordering = ['-created_at']
        unique_together = ['product', 'user']
    
    def __str__(self):
        return f"Отзыв от {self.user.email} на {self.product.name}"

