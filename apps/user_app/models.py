# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import bcrypt

# Create your models here.

class UserHelper(models.Manager):
    pass
    def validate_new_user(self,user):
        def valid_email(email_string):
            dot=0
            at=0
            order=0
            for i in range(1, len(email_string)-1):

                if email_string[i]== ".":
                    dot+=1
                    if at==1:
                        order+=1
                if email_string[i]=="@":
                    at+=1
            if at!=1 or dot<1 or order<1:
                return False
            else:
                return True
        print user["username"]
        checks=[
        [len(user["username"])<2, "username must be at least 3 characters"],
        [len(user["password"])<8, "password must be at least 8 characters"],
        [user["password"]!=user["passwordc"], "passwords must match"],
        [not valid_email(user["email"]), "email must be a valid email"]
        ]
        errors=[]
        for i in checks:
            print i
            if ( i[0]):
                errors.append(i[1])
        return errors
    def verify_login(self, user):

        try:
            bob= User.objects.get(username=user["username"])
            
        except:
            bob=False
            return {"status":"error"}
        if bcrypt.checkpw(user["password"].encode(), bob.passhash.encode()):
            print type(bob)
            
            return {"status":"success", "user":bob}
        else:
            return {"status":"error"}
    def sanitize_user_pw(self, json_user):
        print json_user, type(json_user), "flag json user info"
        final_user={ }
        for k in json_user:
            if k != "passhash":
                final_user[k]=json_user[k]
        return final_user
    def sanitize_mult_user_pw(self, json_users):
        san_users=[]
        for i in range(0, len(json_users)):
            san_users.append(User.objects.sanitize_user_pw(json_users[i]))
        return san_users

        
        


class User(models.Model):
    _id = models.AutoField(primary_key=True)
    username=models.CharField(max_length=255)
    email=models.CharField(max_length=255)
    passhash=models.CharField(max_length=255)
    admin=models.BooleanField()
    objects=UserHelper()
   
