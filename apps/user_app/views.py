# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import unicodedata

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from models import User
from .serializers import User_serializer
from rest_framework.decorators import api_view
import bcrypt
import sqlite3

def parse_req_body(mystr):
    temp=json.loads(mystr)
    ans={}
    for k in temp:
        print temp[k], type(temp[k])
        if type(temp[k])==unicode:

            
            ans[k.encode("UTF-8")]=temp[k].encode("UTF-8")
        else:
            ans[k.encode("UTF-8")]=temp[k]
    print ans
    return ans




        
    


# Create your views here.
@csrf_exempt
def test( request, method="GET"):
    print "intest"
    return JsonResponse({"sucess":"sucess"})

@api_view(["POST"])
def register(request):

    ruser=parse_req_body(request.body)
    

    # print type(ruser),ruser
    errors=User.objects.validate_new_user(ruser)
    if (len(errors)>0):
        return Response({"status":"failure", "errors":errors})
    else:
        hashedpass=bcrypt.hashpw(ruser["password"].encode(),bcrypt.gensalt())

        User.objects.create(username=ruser["username"],passhash=hashedpass,email=ruser["email"],admin=False)
        # 
        # serializer=User_serializer( many=False)

        return Response({"status":"sucess"})

@api_view(["GET"])
def all(request):
    print "in api view"

  

    users=User.objects.all()
    print users 
    szr=User_serializer
    szr_users=szr(users, many=True)
    final_users=User.objects.sanitize_mult_user_pw(szr_users.data)
    
 
    
    return Response({"users":final_users})

@api_view(["POST"])
def delete(request):
    req=parse_req_body(request.body)
    bob=User.objects.get(_id=req["id"])
    bob.delete()
    return Response({"status":"sucess"})

@api_view(["POST"])
def edit(request):
    req=parse_req_body(request.body)
    bob=User.objects.get(_id=req["_id"])
    # hashedpass=bob["passhash"]
    print bob
    bob.username=req["username"]
    bob.email=req["email"]
    if(len(req["password"])>0):
        print "hitting password change"
        hashedpass=bcrypt.hashpw(req["password"].encode(),bcrypt.gensalt())
        print hashedpass
        bob.passhash=hashedpass
    
  
    bob.save()
        
    print req["_id"]
    
    return Response({"status":"sucess"})

@api_view(["POST"])
def login(request):
    
    req=parse_req_body(request.body)
    checkquery=User.objects.verify_login(req)
    print checkquery["user"]
    if (checkquery["status"]=="success"):
        print request.session,"sesh", type(request.session)
        
      
        szr=User_serializer
        srz_bob= szr(checkquery["user"], many=False)
        final_bob=User.objects.sanitize_user_pw(srz_bob.data)
        request.session["cur_user"]= final_bob
        return Response({"status":"success", "user":final_bob})
    else:
        return Response({"status":"error"})

@api_view(["GET"])
def check_user_session(request):
    
    print request.session["cur_user"]
    if  request.session["cur_user"]== None:
        res={"status":False}
    else:
        res={"status": True, "user": request.session["cur_user"]}
    return Response(res)

@api_view(["GET"])
def logout_user(request):
    request.session["cur_user"]=None
    return Response({"status":"logged out"})

@api_view(["GET"])
def create_thor(request):
    password="hammerthis"
    hashedpass=bcrypt.hashpw(password.encode(),bcrypt.gensalt())
    User.objects.create(username="thor",passhash=hashedpass,email="thor@thor.com",admin=True)
    return Response({"Mjölnir":"Whosoever holds this hammer, if he be worthy, shall possess the power of Thor."})


