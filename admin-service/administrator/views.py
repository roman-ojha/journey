from django.shortcuts import render
from rest_framework.generics import ListAPIView
from administrator.models import Admin
from administrator.serializer import GetAdminSerializer, RegisterAdminSerializer
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status


class RegisterAdmin(APIView):
    def post(self, request: Request, format=None):
        serializedAdmin = RegisterAdminSerializer(data=request.data)
        if serializedAdmin.is_valid(raise_exception=True):
            # print(serializedAdmin.data)
            serializedAdmin.save()
            return Response({"message": "Admin registered successfully", 'data': serializedAdmin.data}, status=status.HTTP_201_CREATED)
        return Response(serializedAdmin.errors, status=status.HTTP_200_OK)


class AdminListAPIView(ListAPIView):
    queryset = Admin.objects.all()
    serializer_class = GetAdminSerializer
