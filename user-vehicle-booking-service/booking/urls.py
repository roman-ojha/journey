from django.urls import path
from booking import views

urlpatterns = [
    path("", view=views.book_vehicle_seats, name="booking"),
    # get list of booked vehicles by auth user
    path("booked-vehicle", view=views.get_booked_vehicles,
         name="get_booked_vehicles"),
    path("booked-vehicle/<str:vehicle_slug>",
         view=views.get_booked_vehicle_detail, name="get_booked_vehicle_detail"),
    path("payment/successful/", view=views.book_seats_payment_successful,
         name="book_seats_payment_successful")
]
