from django.urls import path
from django.views.generic.base import View
from .views import RoomView

urlpatterns = [
    path('room',RoomView.as_view())

]
