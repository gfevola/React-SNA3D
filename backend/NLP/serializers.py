from rest_framework import serializers
from .models import JobTitles, Embedding_2


class Embed2Serializer(serializers.ModelSerializer):

    class Meta:
        model = Embedding_2
        fields = ('id', 'ModelKey', 'Embed1Val', 'Embed2Val')

class JDSerializer(serializers.ModelSerializer):

	Embed2 = Embed2Serializer(read_only=True,source="embed2",many=True)
	
	class Meta:
		model = JobTitles
		fields = ('JobCode', 'JobTitle', 'Description','Embed2')