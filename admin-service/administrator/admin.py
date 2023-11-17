from django.contrib import admin
from administrator.models import Admin
from django.contrib.auth.admin import UserAdmin


@admin.register(Admin)
class AdminUser(UserAdmin):
    list_display = ('id', 'email', 'number', 'first_name', 'last_name',)

    ordering = ('email',)
