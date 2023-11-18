from rest_framework import serializers
from administrator.models import Admin


class AdminSerializer(serializers.ModelSerializer):
    c_password = serializers.CharField(write_only=True)

    class Meta:
        model = Admin
        fields = ['id', 'email', 'password', 'c_password',
                  'first_name', 'last_name', 'number']

    def validate(self, attrs):
        if attrs.get('c_password') is not None and attrs['password'] != attrs['c_password']:
            raise serializers.ValidationError({
                "c_password": ["password doesn't match"]
            })
        return super().validate(attrs)

    def create(self, validated_data):
        validated_data.pop('c_password', None)
        return Admin.objects.create_admin(**validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance=instance)
        data.pop('password', None)
        return data
