from rest_framework import serializers
from administrator.models import Admin


class CustomValidationError(serializers.ValidationError):
    status_code = 422


class RegisterAdminSerializer(serializers.ModelSerializer):
    c_password = serializers.CharField(write_only=True)

    class Meta:
        model = Admin
        fields = ['id', 'email', 'password', 'c_password',
                  'first_name', 'last_name', 'number']

    def validate(self, attrs):
        if attrs['password'] != attrs['c_password']:
            raise CustomValidationError({
                "c_password": ["password doesn't match"]
            })
        return super().validate(attrs)

    def create(self, validated_data):
        validated_data.pop('c_password', None)
        return Admin.objects.create_admin(**validated_data)


class SendAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id', 'email', 'first_name', 'last_name', 'number']
