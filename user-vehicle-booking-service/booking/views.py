from rest_framework.response import Response
from rest_framework.decorators import api_view
import pprint
from database.repository import repository
from middlewares.authentication import Request
from data.status_code import StatusCode
from utils.response import CreateResponse

# Create your views here.

printer = pprint.PrettyPrinter()


@api_view(["GET"])
def get_vehicles(request):
    vehicles = repository.get_vehicles()
    return Response(vehicles)


@api_view(["POST"])
def book_vehicle_seats(request: Request):
    data = request.data
    if not data.get('vehicle_id'):
        return Response(data=CreateResponse.validationError(errors={"vehicle_id": ["vehicle_id is required"]}), status=StatusCode.VALIDATION_ERROR)
    if not data.get('seats'):
        return Response(data=CreateResponse.validationError(errors={"seats": ["seats data is required"]}), status=StatusCode.VALIDATION_ERROR)
    if not data.get("vehicle_model_id"):
        return Response(data=CreateResponse.validationError(errors={"vehicle_model_id": ["vehicle_model_id is required"]}), status=StatusCode.VALIDATION_ERROR)

    if not request.auth_user.is_authenticated():
        return Response(data=CreateResponse.failResponse(message="UnAuthorized User, Please login first"), status=StatusCode.UNAUTHORIZED)
    res = repository.book_vehicle_seats(vehicle_id=data.get(
        'vehicle_id'), seats=data.get('seats'), vehicle_model_id=data.get("vehicle_model_id"), user_id=request.auth_user.id)
    print(res)
    return Response()
