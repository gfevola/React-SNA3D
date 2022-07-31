from django.urls import path, include
from django.contrib import admin
from . import views
from rest_framework import routers


router = routers.DefaultRouter()                      # add this
router.register(r'network', views.NetView, 'network') 
router.register(r'network1', views.Visual3dView, 'network')

router.register(r'networkDesc', views.NodeModelView, 'network')
router.register(r'emaildata', views.EmailView, 'network')
 

urlpatterns = [
	path('',include(router.urls)),
	path('Upload/',views.netDataUpload,name="Network-Upload"),
	path('Upload3d/',views.Visual3dUpload, name='upload3d'),	
	path('email/',views.EmailUpload, name='emailUpload'),
]
