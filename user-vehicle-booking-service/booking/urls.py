from django.urls import path
from booking import views

urlpatterns = [
    path("vehicles/", view=views.get_vehicles, name="get_vehicles"),
    path("", view=views.book_vehicle_seats, name="")
]
