from rest_framework.request import Request
from rest_framework.response import Response
from administrator.models import Admin
from administrator.serializer import AdminSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from utils.responseDict import CreateResponse
from data.status_code import StatusCode


# Get, Update, Delete authenticated user profile
class AdminProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs):
        serializedAdmin = AdminSerializer(request.user)
        return Response(serializedAdmin.data)

    def delete(self, request: Request, *args, **kwargs):
        if request.user.delete():
            return Response(CreateResponse.successResponse(message="Your Admin account have deleted successfully"))
        return Response(CreateResponse.failResponse(), status=StatusCode.INTERNAL_SERVER_ERROR)

    def patch(self, request: Request, *args, **kwargs):
        try:
            if 'password' in request.data:
                return Response(CreateResponse.validationError(message="Password can't get updated on the request, Please try not to provide password", errors={"password": ["Password is not required in this request"]}), status=StatusCode.BAD_REQUEST)
            serializedAdmin = AdminSerializer(
                request.user, data=request.data, partial=True)
            if serializedAdmin.is_valid(raise_exception=True):
                return Response(CreateResponse.successResponse(message="Your Admin account have deleted successfully"))
            return Response(serializedAdmin.errors, status=StatusCode.BAD_REQUEST)
        except Admin.DoesNotExist:
            return Response(CreateResponse.failResponse(message="Admin with given id doesn't exist"), status=status.HTTP_404_NOT_FOUND)
