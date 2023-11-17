from django.urls import path, include
from administrator import views

urlpatterns = [
    path('', view=views.AdminListAPIView.as_view(), name='admin'),
    path('auth/register', view=views.RegisterAdmin.as_view(), name='register-admin'),
]
