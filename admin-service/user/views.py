from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from user.serializer import UserSerializer
from user.models import User
from rest_framework.exceptions import ValidationError
from rest_framework import status
from utils.responseDict import CreateResponse
from data.status_code import StatusCode


class UserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs):
        users = User.objects.all()
        serializedUser = UserSerializer(users, many=True)
        return Response(CreateResponse.successResponse(data=serializedUser.data))

    def post(self, request: Request, *args, **kwargs):
        userSerializer = UserSerializer(data=request.data)
        # TODO: Need to hash the given password as well
        if userSerializer.is_valid(raise_exception=True):
            userSerializer.save()
            return Response(CreateResponse.successResponse(UserSerializer(userSerializer.instance).data), status=StatusCode.CREATED)
        return Response(CreateResponse.validationError(errors=userSerializer.errors), status=StatusCode.BAD_REQUEST)

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
                return Response(CreateResponse.successResponse(data=serializedUser.data))
            return Response(CreateResponse.validationError(errors=serializedUser.errors), status=StatusCode.BAD_REQUEST)
        except User.DoesNotExist:
            return Response(CreateResponse.failResponse(message="User with given id doesn't exist"), status=status.HTTP_404_NOT_FOUND)

    def delete(self, request: Request, *args, **kwargs):
        try:
            if request.query_params.get('id') is None:
                raise ValidationError({
                    'id': ["id query parameter is required"]
                })
            id = request.query_params.get('id')
            admin = User.objects.get(id=id)
            admin.delete()
            return Response(CreateResponse.successResponse(message="Record has been deleted"))
        except User.DoesNotExist:
            return Response(CreateResponse.failResponse(message="User with given id doesn't exist"), status=status.HTTP_404_NOT_FOUND)
