from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from user.serializer import UserSerializer
from user.models import User
from rest_framework.exceptions import ValidationError
from rest_framework import status


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
            userSerializer.save()
            return Response(UserSerializer(userSerializer.instance).data)
        return Response(userSerializer.errors)

    def patch(self, request: Request, *args, **kwargs):
        try:
            if request.data.get('id') is None:
                raise ValidationError({
                    "id": ["id field is required"]
                })
            id = request.data['id']
            admin = User.objects.get(id=id)
            serializedUser = UserSerializer(
                instance=admin, data=request.data, partial=True)
            if serializedUser.is_valid(raise_exception=True):
                serializedUser.save()
                return Response(serializedUser.data)
            return Response(serializedUser.errors)
        except User.DoesNotExist:
            return Response({"message": "User with given id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request: Request, *args, **kwargs):
        try:
            if request.query_params.get('id') is None:
                raise ValidationError({
                    'id': ["id query parameter is required"]
                })
            id = request.query_params.get('id')
            admin = User.objects.get(id=id)
            admin.delete()
            return Response({"message": "Record has been deleted"})
        except User.DoesNotExist:
            return Response({"message": "User with given id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
