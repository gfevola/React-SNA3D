from django.urls import path, include
from . import views
from rest_framework import routers


router = routers.DefaultRouter()                      # add this
router.register(r'titles', views.JDView, 'jd') 

#Create your views here.
urlpatterns = [
	path('Upload/',views.UploadJDView,name="JD-Upload"),
	path('',include(router.urls)),
];