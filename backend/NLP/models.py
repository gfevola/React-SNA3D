from django.db import models
#from todo.models import Employee_State

# class Topic(models.Model):
	# TopicName = models.CharField(max_length=120)
	
class JobTitles(models.Model):
	JobCode = models.CharField(max_length=120,primary_key=True)
	JobTitle = models.CharField(max_length=500)
	Description = models.TextField()
	#BestTopic = models.ForeignKey(Topic, related_name='topicmatch', on_delete=models.CASCADE, default="N/A")
	#Embedding2Key = models.ForeignKey(Embedding2,related_name='embed2',on_delete=models.CASCADE,default="N/A")
	#Embedding8Key = models.ForeignKey(Embedding8,related_name='embed8',on_delete=models.CASCADE,default="N/A")
	#EmpJobCode = models.ForeignKey(JobtoEmpModel,to_field="JobCode",related_name="empstate1",on_delete=models.SET_DEFAULT,default="N/A")
	
	def _str_(self):
		return self.JobCode

	
class Embedding_2(models.Model):
	ModelKey = models.ForeignKey(JobTitles,related_name='embed2',on_delete=models.CASCADE,default="N/A")
	Embed1Val = models.DecimalField(max_digits=10,decimal_places=6,default=0)
	Embed2Val = models.DecimalField(max_digits=10,decimal_places=6,default=0)


#class JobtoEmpModel(models.Model):
# 	EmpID = models.ForeignKey(Employee_State,to_field="JobCode",related_name="empstate1",on_delete=models.SET_DEFAULT,default="N/A")
	