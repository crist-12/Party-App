from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room
# Create your views here.

class RoomView(generics.ListAPIView): #Se puede usar generics.CreateAPIView
    queryset = Room.objects.all()
    serializer_class = RoomSerializer








