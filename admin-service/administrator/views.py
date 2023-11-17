from django.shortcuts import render
from rest_framework.generics import ListAPIView
from administrator.models import Admin
from administrator.serializer import GetAdminSerializer


class AdminListAPIView(ListAPIView):
    queryset = Admin.objects.all()
    serializer_class = GetAdminSerializer
