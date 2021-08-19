from django.urls import path
from django.views.generic.base import View
from .views import RoomView, CreateRoomView

urlpatterns = [
    path('room',RoomView.as_view()),
    path('create-room', CreateRoomView.as_view())
]
