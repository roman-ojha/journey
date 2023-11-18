from django.contrib import admin
from user.models import User


@admin.register(User)
class UUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'number', 'f_name',
                    'l_name', 'photo_url', 'gender')
