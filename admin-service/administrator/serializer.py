from rest_framework import serializers
from administrator.models import Admin


class AdminSerializer(serializers.ModelSerializer):
    c_password = serializers.CharField()

    class Meta:
        model = Admin
        fields = ['id', 'email', 'password', 'c_password',
                  'first_name', 'last_name', 'number']


class GetAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id', 'email', 'first_name', 'last_name', 'number']
