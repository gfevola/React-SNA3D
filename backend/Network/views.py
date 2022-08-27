from django.shortcuts import render
from rest_framework import viewsets, mixins  
#from rest_framework.views import APIView 
from rest_framework.response import Response
   
from .models import Document, NetModel, Nodes_Model, Links_Model, Visual3D, NodeDescriptor_Model
from .models import Emails
from .serializers import  NetSerializer, NodeModelSerializer, LinkModelSerializer 
from .serializers import Viz3dSerializer, NodeDescSerializer, EmailSerializer

from todo.models import Demo, Employee

from django.conf import settings
import pandas as pd
import datetime



class NetView(viewsets.ModelViewSet):       
	serializer_class = NetSerializer          
	queryset = NetModel.objects.all()      

class NodeModelView(viewsets.ModelViewSet):       
	serializer_class = NodeModelSerializer          
	queryset = Nodes_Model.objects.all()       

class NodeDescView(viewsets.ModelViewSet):
	serializer_class = NodeDescSerializer          
	queryset = NodeDescriptor_Model.objects.all()      

class LinkModelView(viewsets.ModelViewSet):       
	serializer_class = LinkModelSerializer          
	queryset = Links_Model.objects.all()       

class Visual3dView(viewsets.ModelViewSet):       
	serializer_class = Viz3dSerializer          
	queryset = Visual3D.objects.all()       

class EmailView(viewsets.ModelViewSet):       
	serializer_class = EmailSerializer          
	queryset = Emails.objects.all()       
	
	def get_queryset(self):
		id = self.request.GET.get("testing",None)	
		print(id)
		return(Emails.objects.filter(Sender=id))  


def netDataUpload(request):
	if request.method=='POST':
		unique_string = request.POST['Net_Identifier']
		if request.FILES['NodesFile']!="":
			newfile1 = Document(docfile=request.FILES['NodesFile'])
			newfile1.save()
			path1 = settings.MEDIA_ROOT.replace("\\","/") + "/" + str(newfile1.docfile)
			NodeFile = pd.read_excel(path1)		

			try:
				history = NetModel.objects.get(ModelKey=unique_string)
				history.delete()		
			except:
				pass

			#Save Network Instance
			foo = NetModel(
				ModelKey = unique_string,
				ModelType = 'Employee'
			)
			foo.save()
			
			NodeFile['NodeKeyStr']=[unique_string +"%"+ str(x) for x in NodeFile['GroupName']]
			
			modobj = NetModel.objects.get(ModelKey = unique_string)
			
			#Save nodes data
			for index, row in NodeFile.iterrows():			
				foo = Nodes_Model(
						Node_Key = modobj,
						DescKey = row['NodeKeyStr'], #pseudo primary key
						EmpID = row['GroupName'],
						Name = row['Name'],
						Attribute1 = row['Department'],
						Attribute2 = row['Service Line'],
						Attribute3 = row['ManagerLevel'],
					)
				foo.save()
			print("uploaded nodes")	
			
			for index, row in NodeFile.iterrows():	
				bar = NodeDescriptor_Model(
					NDesc_Key = Nodes_Model.objects.get(DescKey = row['NodeKeyStr']),
					EmpID = row['GroupName'],
					Grouping = row['KMeans'],
					Centrality_Measure1 = row['Betweenness'],
					Centrality_Measure2 = row['NodeDegree'],
					JDMeasure1 = row['X1'],
					JDMeasure2 = row['X2'],
					JDMeasure3 = row['X3'],
					JDMeasure4 = row['X4'],
					JDMeasure5 = row['X5']
				)
				bar.save()
			print("uploaded node desc")
			
			#########################
			#links data
			if request.FILES['LinksFile']!="":
				newfile2 = Document(docfile=request.FILES['LinksFile'])
				newfile2.save()
				path2 = settings.MEDIA_ROOT.replace("\\","/") + "/" + str(newfile2.docfile)
				LinkFile = pd.read_excel(path2)
				
				#Save links data
				for index, row in LinkFile.iterrows():
					foo = Links_Model(
							Link_Key = modobj,
							Sender = row['SenderID'],
							Recipient = row['RecipientID'],
							Count = row['Count']+.0001,
						)
					foo.save()
					
			################################
			#Email data
			if request.FILES['EmailsFile']!="":
				newfile = Document(docfile=request.FILES['EmailsFile'])
				newfile.save()
				path = settings.MEDIA_ROOT.replace("\\","/") + "/" + str(newfile.docfile)
				
				EmailFile = pd.read_excel(path)
				modelobj = NetModel.objects.get(ModelKey = unique_string)

				for index, row in EmailFile.iterrows():		
					#Make sure sender/recip are employee objects
					Employee.Object.checkEmp(row,"SenderID","Sender",datetime.datetime.now())
					Employee.Object.checkEmp(row,"RecipientID","Recipient",datetime.datetime.now())
					
					Sender = Employee.Object.get(EmpID=row["SenderID"])
					Recipient = Employee.Object.get(EmpID=row["RecipientID"])
					
					foo = Emails(
							Email_Key = modelobj,
							Date = row['Date'],
							Sender = Sender,
							Recipient = Recipient,
							Inverted = False,
						)
					foo.save()
					foo = Emails(
							Email_Key = modelobj,
							Date = row['Date'],
							Sender = Recipient,
							Recipient = Sender,
							Inverted = True,
						)
					foo.save()
					
	return render(request,"Network/UploadData.html")


def Visual3dUpload(request):
	if request.method=='POST':
		if request.FILES['File3d']!="":
			newfile = Document(docfile=request.FILES['File3d'])
			newfile.save()
			path = settings.MEDIA_ROOT.replace("\\","/") + "/" + str(newfile.docfile)
	
	
			File3D = pd.read_excel(path)
				#Save nodes data
			for index, row in File3D.iterrows():
				foo = Visual3D(
						Name = row['Job.Title'],
						Xvalue = row['Y.1'],
						Yvalue = row['Y.2'],
						Zvalue = row['Y.3'],
						Attribute1 = row['KMeans'],
						Attribute2 = row['Job.Function'],
						Attribute3 = row['Manager.Level'],
						
					)
				foo.save()
	return render(request,"Network/UploadViz.html")
	
	
def EmailUpload(request):
	if request.method=='POST':
		unique_string = request.POST['Net_Identifier']
		if request.FILES['EmailsFile']!="":
			newfile = Document(docfile=request.FILES['EmailsFile'])
			newfile.save()
			path = settings.MEDIA_ROOT.replace("\\","/") + "/" + str(newfile.docfile)
			
			EmailFile = pd.read_excel(path)
				
			#NetModel - for now - should be a class property of the model
			try:
				history = NetModel.objects.get(ModelKey=unique_string)
				history.delete()		
			except:
				pass
						
			#Save Network Instance
			foo = NetModel(
				ModelKey = unique_string,
				ModelType = 'Employee'
			)
			foo.save()
			
			modelobj = NetModel.objects.get(ModelKey = unique_string)

			for index, row in EmailFile.iterrows():		
				#Make sure sender/recip are employee objects
				Employee.Object.checkEmp(row,"SenderID","Sender",datetime.datetime.now())
				Employee.Object.checkEmp(row,"RecipientID","Recipient",datetime.datetime.now())
				
				Sender = Employee.Object.get(EmpID=row["SenderID"])
				Recipient = Employee.Object.get(EmpID=row["RecipientID"])
				
				foo = Emails(
						Email_Key = modelobj,
						Date = row['Date'],
						Time = row['Time'],
						Sender = Sender,
						Recipient = Recipient,
						Inverted = False,
					)
				foo.save()
				foo = Emails(
						Email_Key = modelobj,
						Date = row['Date'],
						Time = row['Time'],
						Sender = Recipient,
						Recipient = Sender,
						Inverted = True,
					)
				foo.save()
				
	return render(request,"Network/UploadEmail.html")