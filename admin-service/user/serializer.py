from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'number', 'f_name',
                        'l_name', 'photo_url', 'gender', 'is_verified', 'created_at', 'updated_at')
