from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from .models import User


class UserCreateSerializer(BaseUserCreateSerializer):
    """Сериализатор для регистрации пользователя"""
    
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['id', 'email', 'username', 'password', 'first_name', 'last_name', 'phone']


class UserSerializer(BaseUserSerializer):
    """Сериализатор для получения данных пользователя"""
    
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'phone', 'avatar', 'address', 'city', 'postal_code',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

