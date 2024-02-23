from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
import pprint

# Create your views here.

printer = pprint.PrettyPrinter()


@api_view(["GET"])
def get_vehicles(request):
    # print(vehicles)
    # serializedVehicles = VehicleSerializer(data=vehicles, many=True)
    # if serializedVehicles.is_valid():
    #     return Response(serializedVehicles.data)
    # return JsonResponse(vehicle)
    return Response({"message": "Hello, world!"},)
