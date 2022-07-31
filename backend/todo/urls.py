from django.urls import path, include
from django.contrib import admin
from . import views
from rest_framework import routers


router = routers.DefaultRouter()                      # add this
router1 = routers.DefaultRouter()  

router.register(r'reports', views.FieldView, 'report') 
router1.register(r'reports', views.ReportView, 'demo') 
router.register(r'employee', views.EmpView, 'employee') 
router.register(r'empstate', views.EmpStateView, 'employee_state') 


urlpatterns = [
	path('',include(router.urls)),
	path('demo/',include(router1.urls)),
	path('upload/',views.ImportView, name='upload'),
	path('uploadstate/',views.ImportStateView, name='upload_state'),
    path(r'todo-data/', views.TodoView, name='employee_data'),
	
]
