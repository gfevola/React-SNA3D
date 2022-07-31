from django.db import models
import datetime
from NLP.models import JobTitles


# practice model
class Todo(models.Model):
	title = models.CharField(max_length=120)
	description = models.TextField()
	completed = models.BooleanField(default=False)
	DEPARTMENT_CHOICES = (
        ('hr', 'Human Resources'),
        ('finance', 'Finance'),
        ('engineering', 'Engineering'),
        ('marketing', 'Marketing'),
        ('sales', 'Sales'),	
	)
	
	def _str_(self):
		return self.title

##For Saving Doc
class Document(models.Model):
	docfile = models.FileField(upload_to='documents')
	
	
#-========================================
class AddEmployee(models.Manager):	
	def checkEmp(self,row,IDKey,NameKey,time):
		#for each - check if employee exists
			Emp = self.filter(EmpID=row[IDKey])
			if Emp.count()==0:
				bar = Employee(
						EmpID = row[IDKey],	
						Name = row[NameKey],
						CreateDate = time
					)
				bar.save()
				print("Added "+row[IDKey] + " - " + row[NameKey])

class Employee(models.Model):
	EmpID = models.CharField(max_length=20,default="N/A",primary_key=True)
	Name = models.CharField(max_length=200,default="N/A")
	CreateDate = models.DateField(("Date"))
	EmailAddress = models.CharField(max_length=100,default="N/A")
	Object = AddEmployee()

	def _str_(self):
		return self.EmpID

# #list of employees at different times - may replace demographic
class Employee_State(models.Model):
	EmpID = models.ForeignKey(Employee,related_name='encryptEmp',on_delete=models.CASCADE)
	Name = models.CharField(max_length = 200,default="N/A")
	ModelKey = models.CharField(max_length=30,default="N/A") #to group entries, i.e. Demographic, Hires
	Date = models.DateField(("Date"))
	JobCode = models.CharField(max_length=120,default="N/A")
	Salary = models.DecimalField(max_digits=10,decimal_places=2,default=0)
	Department = models.CharField(max_length=120,default="N/A")
	Location = models.CharField(max_length=120,default="N/A")
	ServiceLine = models.CharField(max_length=120,default="N/A")
	Embedding1 = models.DecimalField(max_digits=10,decimal_places=6,default=0)
	Embedding2 = models.DecimalField(max_digits=10,decimal_places=6,default=0)
	
#-===========================================
	
	
##Report Main##		
class Report(models.Model):
	Report_Key = models.CharField(max_length=100,primary_key=True)
	Report_Type = models.CharField(max_length=50,default="N/A")
	Report_Date = models.DateField(("Date"),default=datetime.date.today)
	
	def _str_(self):
		return self.Report_Key


#Demographic
class Demo(models.Model):
	Report = models.ForeignKey(Report,related_name='encrypt1',on_delete=models.CASCADE,default="N/A")
	EmpID = models.ForeignKey(Employee,related_name='emp_demo',on_delete=models.CASCADE,default="N/A")
	Name = models.CharField(max_length=120,default="N/A")
	JobCode = models.CharField(max_length=120,default="N/A")
	Salary = models.DecimalField(max_digits=10,decimal_places=2,default=0)
	Department = models.CharField(max_length=120,default="N/A")
	Location = models.CharField(max_length=120,default="N/A")
	
	
	def _str_(self):
		return self.Name

#Hires
class Hires(models.Model):
	Report = models.ForeignKey(Report,related_name='encrypt2',on_delete=models.CASCADE,default="N/A")
	HireDate = models.DateField(("Date"))
	EmpID = models.ForeignKey(Employee,related_name='emp_hire',on_delete=models.CASCADE,default="N/A")
	Name = models.CharField(max_length=120,default="N/A")
	JobTitle = models.CharField(max_length=120,default="N/A")
	Salary = models.DecimalField(max_digits=10,decimal_places=2,default=0)
	Department = models.CharField(max_length=120,default="N/A")
	Location = models.CharField(max_length=120,default="N/A")
	
	def _str_(self):
		return self.Name
		
		
#Terms
class Terms(models.Model):
	Report = models.ForeignKey(Report,related_name='encrypt3',on_delete=models.CASCADE,default="N/A")
	TermDate = models.DateField(("Date"))
	Name = models.CharField(max_length=120,default="N/A")
	JobTitle = models.CharField(max_length=120,default="N/A")
	Salary = models.DecimalField(max_digits=10,decimal_places=2,default=0)
	Department = models.CharField(max_length=120,default="N/A")
	Location = models.CharField(max_length=120,default="N/A")
	
	def _str_(self):
		return self.Name
		
		
#Field Summary Model
class ModelCols(models.Model):
	ReportName = models.ForeignKey(Report,related_name='encrypt4',on_delete=models.CASCADE,default="N/A")
	ColumnName = models.CharField(max_length=120,default="N/A")
	FieldType = models.CharField(max_length=30,default="N/A")

	def _str_(self):
		return self.ReportName