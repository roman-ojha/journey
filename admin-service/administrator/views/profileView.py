from rest_framework.request import Request
from rest_framework.response import Response
from administrator.models import Admin
from administrator.serializer import AdminSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


# Get, Update, Delete authenticated user profile
class AdminProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs):
        serializedAdmin = AdminSerializer(request.user)
        return Response(serializedAdmin.data)
