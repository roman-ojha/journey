from django.urls import path
from booking import views

urlpatterns = [
    path("", view=views.get_vehicles, name="get_vehicles"),
]
