from django.urls import path
from booking import views

urlpatterns = [
    # get list of booked vehicles by auth user
    path("", view=views.book_vehicle_seats, name="booking"),
    path("booked-vehicles", view=views.get_booked_vehicles, name="get_vehicles")
]
