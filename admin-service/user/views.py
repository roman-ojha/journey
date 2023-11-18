from django.shortcuts import render
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from user.serializer import UserSerializer
from user.models import User


class UserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs):
        users = User.objects.all()
        serializedUser = UserSerializer(users, many=True)
        return Response(serializedUser.data)

    def post(self, request: Request, *args, **kwargs):
        userSerializer = UserSerializer(data=request.data)
        if userSerializer.is_valid(raise_exception=True):
            print(userSerializer.data)
            return Response(userSerializer.data)
        return Response(userSerializer.errors)
