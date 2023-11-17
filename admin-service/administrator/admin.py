from django.contrib import admin
from administrator.models import Admin
from django.contrib.auth.admin import UserAdmin


@admin.register(Admin)
class AdminUser(UserAdmin):
    list_display = ('id', 'email', 'number', 'first_name', 'last_name',)

    ordering = ('email',)
    exclude = ('username',)
    fieldsets = (
        ("Admin:", {
            'fields': ('email', 'password', 'first_name', "last_name"),
        }),
        ('Permissions:', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important Dates:', {
            'fields': ('last_login', 'date_joined'),
        }),
    )
