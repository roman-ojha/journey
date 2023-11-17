from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser


class AdminManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            **extra_fields
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser has to have is_staff being true")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser has to have is_superuser being true")

        return self.create_user(email=email, password=password, **extra_fields)


class Admin(AbstractUser):
    email = models.CharField(max_length=80, unique=True)
    username = None
    is_verified = models.BooleanField(default=False)
    verification_token = models.TextField(default="")
    number = models.BigIntegerField(null=False)
    # first_name
    # last_name
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['number', 'first_name', 'last_name']

    objects = AdminManager()

    def __str__(self) -> str:
        return self.email
