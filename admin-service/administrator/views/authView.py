from django.shortcuts import render
from administrator.serializer import AdminSerializer
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class RegisterAdmin(APIView):
    def post(self, request: Request, format=None):
        serializedAdmin = AdminSerializer(data=request.data)
        if serializedAdmin.is_valid(raise_exception=True):
            serializedAdmin.save()
            return Response({"message": "Admin registered successfully", 'data': serializedAdmin.data}, status=status.HTTP_201_CREATED)
        return Response(serializedAdmin.errors, status=status.HTTP_200_OK)


class LoginAdmin(APIView):
    def post(self, request: Request, *args, **kwargs):
        pass


class AdminAuthCheck(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs):
        serializedAdmin = AdminSerializer(request.user)
        return Response({'message': "Auth User", "data": serializedAdmin.data})
