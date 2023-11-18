from rest_framework.generics import ListAPIView
from administrator.models import Admin
from administrator.serializer import SendAdminSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class AdminListAPIView(ListAPIView):
    queryset = Admin.objects.all()
    serializer_class = SendAdminSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
