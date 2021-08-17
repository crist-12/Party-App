from django.db import models
import string
import random

def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length)) #Genera un codigo aleatorio
        if Room.objects.filter(code = code).count() == 0: #Se va a la base de datos para ver que no haya un codigo repetido
            break # Si no hay me salgo
    return code # Retorno el codigo




#Modelos son como las tablas
# Esta funcion simula como una capa de abstraccion
class Room(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
