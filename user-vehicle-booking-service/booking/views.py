from rest_framework.response import Response
from rest_framework.decorators import api_view
import pprint
from database.repository import repository
from middlewares.authentication import Request
from data.status_code import StatusCode
from utils.response import CreateResponse
import requests
import random
import os
from data.constants import Constants

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
        return Response(data=CreateResponse.failResponse(message="vehicle_id is required"), status=StatusCode.BAD_REQUEST)
    if not data.get('seats'):
        return Response(data=CreateResponse.failResponse(message="seats data is required"), status=StatusCode.BAD_REQUEST)
    if not request.auth_user.is_authenticated():
        return Response(data=CreateResponse.failResponse(message="UnAuthorized User, Please login first"), status=StatusCode.UNAUTHORIZED)

    res = repository.book_vehicle_seats(vehicle_id=data.get(
        'vehicle_id'), seats=data.get('seats'), user_id=request.auth_user.id)
    if res.get('error'):
        return Response(data=CreateResponse.failResponse(message=res.get('message')), status=StatusCode.BAD_REQUEST)

    # # Initiate the payment using Khalti
    # # Khalti api request header & parameters
    requestHeader = {"Authorization": os.environ.get(
        "KHALTI_LIVE_SECRET_KEY")}
    requestParameters = {
        "return_url": os.environ.get("USER_VEHICLE_BOOKING_SERVICE_URL") + "/api/user/booking/payment/successful",
        "website_url": os.environ.get("USER_VEHICLE_BOOKING_SERVICE_URL"),
        # "amount": res['data']['total_price'],
        "amount": 6400,
        "purchase_order_id": f"{Constants.APPLICATION_NAME}-khalti-{request.auth_user.id}-{random.randint(1000000000, 9999999999)}",
        "purchase_order_name": f"Vehicle seat booking payment",
    }
    # request to khalti to initiate the payment
    paymentInitResponse = requests.post(
        os.environ.get("KHALTI_PAYMENT_BASE_URL") + "/epayment/initiate/", headers=requestHeader, data=requestParameters)
    print(paymentInitResponse.text)
    if paymentInitResponse.status_code != 200:
        return Response(data=CreateResponse.failResponse(message="Failed to initiate the payment, please try again."), status=StatusCode.BAD_REQUEST)
    paymentInitResData = paymentInitResponse.json()
    return Response(data=CreateResponse.successResponse(message="Seats booked successfully.", data={
        'pidx': paymentInitResData.get('pidx'), 'payment_url': paymentInitResData.get('payment_url')}))
