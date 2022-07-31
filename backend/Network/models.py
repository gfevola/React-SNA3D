from django.db import models
from todo.models import Employee

import datetime

#Not Using?
class Document(models.Model):
	docfile = models.FileField(upload_to='documents')


##################
class NetModel(models.Model):
	ModelKey = models.CharField(max_length=100,primary_key=True,default="N/A")
	ModelType = models.CharField(max_length=100,default="N/A")

class Nodes_Model(models.Model):
	Node_Key = models.ForeignKey(NetModel,max_length=100,on_delete=models.CASCADE, related_name='node_encrypt')
	DescKey =  models.CharField(max_length=200,default="N/A")
	EmpID = models.CharField(max_length=100,default="N/A")
	Name = models.CharField(max_length=100,default="N/A")
	Attribute1 = models.CharField(max_length=200,default="N/A")
	Attribute2 = models.CharField(max_length=200,default="N/A")
	Attribute3 = models.CharField(max_length=200,default="N/A")
   
	def _str_(self):
		return self.Name

class Links_Model(models.Model):
	Link_Key = models.ForeignKey(NetModel,max_length=100, on_delete=models.CASCADE, related_name='link_encrypt')
	Sender = models.CharField(max_length=1000,default="N/A")
	Recipient = models.CharField(max_length=1000,default="N/A")
	Count = models.DecimalField(max_digits=10,decimal_places=2,default=0)
	
	
class NodeDescriptor_Model(models.Model):
	NDesc_Key = models.ForeignKey(Nodes_Model,max_length=100,on_delete=models.CASCADE, related_name='desc_encrypt')
	EmpID = models.CharField(max_length=100,default="N/A")
	Grouping = models.IntegerField(default=0)
	Centrality_Measure1 = models.DecimalField(max_digits=50,decimal_places=6,default=0)
	Centrality_Measure2 = models.DecimalField(max_digits=50,decimal_places=6,default=0)
	JDMeasure1 = models.DecimalField(max_digits=50,decimal_places=6,default=0)
	JDMeasure2 = models.DecimalField(max_digits=50,decimal_places=6,default=0)
	JDMeasure3 = models.DecimalField(max_digits=50,decimal_places=6,default=0)
	JDMeasure4 = models.DecimalField(max_digits=50,decimal_places=6,default=0)
	JDMeasure5 = models.DecimalField(max_digits=50,decimal_places=6,default=0)
######################


#for THREE.js spatial representation
class Visual3D(models.Model):
	Name = models.CharField(max_length=1000,default="N/A")
	Xvalue = models.DecimalField(max_digits=10,decimal_places=3,default=0)
	Yvalue = models.DecimalField(max_digits=10,decimal_places=3,default=0)
	Zvalue = models.DecimalField(max_digits=10,decimal_places=3,default=0)
	Attribute1 = models.CharField(max_length=1000,default="N/A")
	Attribute2 = models.CharField(max_length=1000,default="N/A")	
	Attribute3 = models.CharField(max_length=1000,default="N/A")
	Attribute4 = models.CharField(max_length=1000,default="N/A")	
	
	
#######emails: Top-level model
#-========================================
class AddEmailAddress(models.Manager):	
	def checkAddr(self,row,IDKey,NameKey,time):
		#for each - check if employee exists
			Emp = self.filter(EmpID=row[IDKey])
			if Emp.count()==0:
				bar = EmailAddress(
						EmpID = row[IDKey],	
						Name = row[NameKey],
						CreateDate = time
					)
				bar.save()
				print("Added "+row[IDKey] + " - " + row[NameKey])

class EmailAddress(models.Model):
	AddressKey = models.CharField(max_length=100)
	AddressName = models.CharField(max_length=200,default="N/A")
	EmpID = models.CharField(max_length=20,default="N/A",primary_key=True)
	CreateDate = models.DateField(("Date"))
	Object = AddEmailAddress()

	def _str_(self):
		return self.AddressName
		

#emails
class Emails(models.Model):
	Email_Key = models.ForeignKey(NetModel,max_length=100,on_delete=models.CASCADE, related_name='email_encrypt')
	Date = models.DateTimeField()
	Time = models.TimeField(default=datetime.datetime(1900, 1, 1, 0,0,0))
	Sender = models.ForeignKey(Employee,max_length=200,on_delete=models.CASCADE, related_name='email_send')
	Recipient = models.ForeignKey(Employee,max_length=200,on_delete=models.CASCADE, related_name='email_recip')
	Inverted = models.BooleanField(default=False)
