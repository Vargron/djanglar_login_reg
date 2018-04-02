from django.conf.urls import url, include
from . import views

urlpatterns = [
 
    
    url(r'^test', views.test),
    url(r'^register', views.register),
    url(r'^all', views.all),
    url(r'^delete', views.delete), 
    url(r'^edit', views.edit),
    url(r'^login', views.login),
    url(r'^check_logged_in', views.check_user_session),
    url(r'^logout_current_user', views.logout_user),
    url(r'^create_default_admin', views.create_thor),

]