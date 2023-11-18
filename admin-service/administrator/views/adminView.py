from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from administrator.models import Admin
from administrator.serializer import SendAdminSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response


# class AdminListAPIView(ListAPIView):
#     queryset = Admin.objects.all()
#     serializer_class = SendAdminSerializer
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]


class AdminView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs):
        admins = Admin.objects.all()
        serializedAdmins = SendAdminSerializer(admins, many=True)
        return Response(serializedAdmins.data)

    def patch(self, request: Request, *args, **kwargs):
        print(request.data)
        return Response({"msg": ""})
