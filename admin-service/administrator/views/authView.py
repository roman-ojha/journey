from django.shortcuts import render
from administrator.serializer import AdminSerializer
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from utils.responseDict import CreateResponse
from data.status_code import StatusCode


class RegisterAdmin(APIView):
    def post(self, request: Request, format=None):
        serializedAdmin = AdminSerializer(data=request.data)
        if serializedAdmin.is_valid(raise_exception=True):
            serializedAdmin.save()
            return Response(CreateResponse.successResponse(message="Admin registered successfully", data=serializedAdmin.data))
        return Response(serializedAdmin.errors, status=status.HTTP_200_OK)


class LoginAdmin(APIView):
    def post(self, request: Request, *args, **kwargs):
        pass
