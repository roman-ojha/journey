from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from administrator.models import Admin
from administrator.serializer import AdminSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from data.status_code import StatusCode
from utils.responseDict import CreateResponse


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
        return Response(CreateResponse.successResponse(data=serializedAdmins.data))

    def patch(self, request: Request, *args, **kwargs):
        try:
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
                return Response(CreateResponse.successResponse(data=serializedAdmin.data))
            return Response(CreateResponse.validationError(errors=serializedAdmin.errors), status=StatusCode.BAD_REQUEST)
        except Admin.DoesNotExist:
            return Response(CreateResponse.failResponse(message="Admin with given id doesn't exist"), status=StatusCode.NOT_FOUND)

    def delete(self, request: Request, *args, **kwargs):
        try:
            if request.query_params.get('id') is None:
                raise ValidationError({
                    'id': ["id query parameter is required"]
                })
            id = request.query_params.get('id')
            admin = Admin.objects.get(id=id)
            if admin.delete():
                return Response(CreateResponse.successResponse(message="Record has been deleted"))
            return Response(CreateResponse.failResponse(), status=StatusCode.INTERNAL_SERVER_ERROR)
        except Admin.DoesNotExist:
            return Response(CreateResponse.failResponse(message="User with given id doesn't exist"), status=StatusCode.NOT_FOUND)
