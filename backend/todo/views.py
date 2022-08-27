from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from .serializers import (TodoSerializer, ReportSerializer, 
							DemoSerializer, HireSerializer, 
							FieldSerializer, EmployeeSerializer, EmployeeStateSerializer)   
from .models import (Document, Todo, Employee, Report, 
						Demo, Hires, ModelCols, Employee_State)      
from django.http import HttpResponseRedirect, HttpResponse
from NLP.models import JobTitles

from datetime import datetime
import pandas as pd
from django.conf import settings

class TodoView(viewsets.ModelViewSet):       
	serializer_class = TodoSerializer   
	queryset = Todo.objects.all()           

class ReportView(viewsets.ModelViewSet):       
	serializer_class = ReportSerializer          
	queryset = Report.objects.all()           	
	#queryset = Report.objects.all().prefetch_related('encrypt1') #not needed

class DemoView(viewsets.ModelViewSet):       
    serializer_class = DemoSerializer          
    queryset = Demo.objects.all()           	

class HireView(viewsets.ModelViewSet):       
	serializer_class = HireSerializer          
	queryset = Hires.objects.all()           	

class FieldView(viewsets.ModelViewSet):       
	serializer_class = FieldSerializer          
	queryset = ModelCols.objects.all()           	

class EmpView(viewsets.ModelViewSet):       
	serializer_class = EmployeeSerializer          
	queryset = Employee.Object.all()  

#new
class EmpStateView(viewsets.ModelViewSet):       
	serializer_class = EmployeeStateSerializer          
	queryset = Employee_State.objects.all()  

def ImportView(request):
	if request.method=='POST':
		#variables
		rep_id = request.POST['ReportID']
		rep_cat = request.POST['ModelCategory']
		rep_date = pd.to_datetime(request.POST['ReportDate'],format="%m/%d/%Y")
		
		if request.FILES['DataFile']!="":
			newfile = Document(docfile=request.FILES['DataFile'])
			newfile.save()
			path = settings.MEDIA_ROOT.replace("\\","/") + "/" + str(newfile.docfile)

			DataFile = pd.read_excel(path)

			#Delete Old Report Instance
			history = Report.objects.filter(Report_Key=rep_id)
			history.delete()	
			
			#Save Report Instance
			foo = Report(
				Report_Key = rep_id,
				Report_Type = rep_cat,
				Report_Date = rep_date
			)
			foo.save()
				
			if request.POST['ModelCategory']=="Demographic":
				#history_Demo = Demo.objects.filter(Report=history)
				
				#Save Demo data
				for index, row in DataFile.iterrows():
					
					Employee.Object.checkEmp(row,"EmpID","Name",datetime.now())
					
					Emp = Employee.Object.get(EmpID=row['EmpID'])
					foo = Demo(
							Report = Report.objects.get(Report_Key = rep_id),
							Name = row['Name'],
							EmpID = Emp, #foreign key to employee model
							Department = row['Department'],
							Location = row['Location'],
							JobCode = row['Job Code'],
						)
					foo.save()
				print('completed')
				
	return render(request,"todo/UploadTemplate.html")
	

def ImportView(request):
	if request.method=='POST':
		#variables
		rep_id = request.POST['ReportID']
		rep_cat = request.POST['ModelCategory']
		rep_date = pd.to_datetime(request.POST['ReportDate'],format="%m/%d/%Y")
		
		if request.FILES['DataFile']!="":
			newfile = Document(docfile=request.FILES['DataFile'])
			newfile.save()
			path = settings.MEDIA_ROOT.replace("\\","/") + "/" + str(newfile.docfile)

			DataFile = pd.read_excel(path)
			
				
			#Save Demo data
			for index, row in DataFile.iterrows():
				
				Employee.Object.checkEmp(row,"EmpID","Name",datetime.now())
				
				Emp = Employee.Object.get(EmpID=row['EmpID'])

				if rep_cat=="Demographic":
					date = rep_date
				else:
					date = row['Date']

				foo = Employee_State(
						EmpID = Emp, #foreign key to employee model					
						ModelKey = rep_cat,
						Name = row['Name'],
						Date = date,
						Salary = row['Salary'],
						Department = row['Department'],
						Location = row['Location'],
						ServiceLine = row['Service Line'],
						JobCode = row['Job Code'],
						Embedding1 = row['X1'],
						Embedding2 = row['X2'],
					)
				foo.save()
			print('completed')
				
	return render(request,"todo/UploadTemplate - State.html")