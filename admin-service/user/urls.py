from django.contrib import admin
from django.urls import path, include
from user.views import UserView

urlpatterns = [
    path('', UserView.as_view(), name="user"),
]
