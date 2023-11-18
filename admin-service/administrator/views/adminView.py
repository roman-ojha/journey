from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from administrator.models import Admin
from administrator.serializer import AdminSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import status


# class AdminListAPIView(ListAPIView):
#     queryset = Admin.objects.all()
#     serializer_class = SendAdminSerializer
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]


# CRUD list of admin to use for Admin table in dashboard
class AdminView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs):
        admins = Admin.objects.all()
        serializedAdmins = AdminSerializer(admins, many=True)
        return Response(serializedAdmins.data)

    def patch(self, request: Request, *args, **kwargs):
        if request.data.get('id') is None:
            raise ValidationError({
                "id": ["id field is required"]
            })
        id = request.data['id']
        admin = Admin.objects.get(id=id)
        serializedAdmin = AdminSerializer(
            instance=admin, data=request.data, partial=True)
        if serializedAdmin.is_valid(raise_exception=True):
            serializedAdmin.save()
            return Response(serializedAdmin.data)
        return Response(serializedAdmin.errors)

    def delete(self, request: Request, *args, **kwargs):
        try:
            if request.query_params.get('id') is None:
                raise ValidationError({
                    'id': ["id query parameter is required"]
                })
            id = request.query_params.get('id')
            admin = Admin.objects.get(id=id)
            admin.delete()
            return Response({"message": "Record has been deleted"})
        except Admin.DoesNotExist:
            return Response({"message": "User with given id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
