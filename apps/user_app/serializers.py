from rest_framework import serializers
from models import User

class User_serializer(serializers.ModelSerializer):
    _id=serializers.IntegerField()
    username=serializers.CharField(max_length=255)
    email=serializers.CharField(max_length=255)
    passhash=serializers.CharField(max_length=255)
    admin=serializers.BooleanField()

    class Meta:
        model=User
        fields=('_id','username', 'email', 'passhash', "admin") #used to select individual fields

