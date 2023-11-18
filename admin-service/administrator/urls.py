from django.urls import path, include
from administrator import views
from administrator.views import authView, adminView, profileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

auth_pattern = [
    path('register', view=authView.RegisterAdmin.as_view(), name='register-admin'),
    path('login', TokenObtainPairView.as_view(), name="login"),
    path('refresh', TokenRefreshView.as_view(), name='refresh-token'),
]

urlpatterns = [
    path('', view=adminView.AdminView.as_view(), name='list-of-admin'),
    path('profile/', profileView.AdminProfileView.as_view(), name='admin-profile'),
    path('auth/', include(auth_pattern)),
]
