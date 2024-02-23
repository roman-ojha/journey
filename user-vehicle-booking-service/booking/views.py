from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
import pprint
from database.repository import repository
from middlewares.authentication import Request

# Create your views here.

printer = pprint.PrettyPrinter()


@api_view(["GET"])
def get_vehicles(request):
    vehicles = repository.get_vehicles()
    return Response(vehicles)


@api_view(["GET", "POST"])
def book_vehicle_seats(request: Request):
    # data = request.headers.get('x-user')
    # printer.pprint(data)
    print(request.auth_user.id)
    return Response()
