from django.shortcuts import render
from .models import JobTitles, Embedding_2
from rest_framework import viewsets
from todo.models import Document
from django.conf import settings
from .serializers import JDSerializer

import pandas as pd


class JDView(viewsets.ModelViewSet):       
	serializer_class = JDSerializer          
	queryset = JobTitles.objects.all()     

# # Create your views here.
def UploadJDView(request):
	if request.method=='POST':
		
		if request.FILES['DataFile']!="":
			newfile = Document(docfile=request.FILES['DataFile'])
			newfile.save()
			path = settings.MEDIA_ROOT.replace("\\","/") + "/" + str(newfile.docfile)

			DataFile = pd.read_excel(path)
	
			hist = JobTitles.objects.all()
			hist.delete()
			
			#save JD
			for index, row in DataFile.iterrows():
				foo = JobTitles(
						JobCode = row['Job Code'],
						JobTitle = row['Job Title'],
						Description = "Nothing",
						#BestTopic = 1,
					)
				foo.save()
				
			#save embeddings
			for index, row in DataFile.iterrows():
				JT = JobTitles.objects.get(JobCode=str(row['Job Code']))
				foo = Embedding_2(
					ModelKey = JT,
					Embed1Val = row['X1'],
					Embed2Val = row['X2'],
				)
				foo.save()
			
				
	return render(request,"NLP/UploadDesc.html")				