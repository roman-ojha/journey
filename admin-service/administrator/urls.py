from django.urls import path, include
from administrator import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

auth_pattern = [
    path('register', view=views.RegisterAdmin.as_view(), name='register-admin'),
    path('login', TokenObtainPairView.as_view(), name="login"),
    path('refresh', TokenRefreshView.as_view()),
    path('check', views.AdminAuthCheck.as_view(), name="auth-check"),
]

urlpatterns = [
    path('', view=views.AdminListAPIView.as_view(), name='admin'),
    path('auth/', include(auth_pattern)),
]
