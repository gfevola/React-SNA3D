from rest_framework import serializers
from .models import NetModel, Nodes_Model, Links_Model, Visual3D, NodeDescriptor_Model
from .models import Emails
from todo.serializers import EmployeeSerializer

####################################
class NodeDescSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = NodeDescriptor_Model
		fields = ("id","NDesc_Key","EmpID","Grouping","Centrality_Measure1","Centrality_Measure2","JDMeasure1","JDMeasure2","JDMeasure3","JDMeasure4","JDMeasure5")	

	
class NodeModelSerializer(serializers.ModelSerializer):
	#link = LinkSerializer(read_only=True,source="name_encrypt",many=True) #encrypt1 = by sender
	nodefields = NodeDescSerializer(read_only=True,source="desc_encrypt",many=True)
	
	class Meta:
		model = Nodes_Model
		fields = ("Node_Key","DescKey","EmpID","Name","Attribute1", "Attribute2","Attribute3","nodefields")


class LinkModelSerializer(serializers.ModelSerializer):
	#node = NodeModelSerializer(read_only=True,source="node_encrypt",many=True)

	class Meta:
		model = Links_Model
		fields = ('Link_Key','Sender','Recipient', 'Count')

class EmailSerializer(serializers.ModelSerializer):
	email = EmployeeSerializer(read_only=True,source="email_send",many=True)
	
	class Meta:
		model = Emails
		fields = ("Date","Sender","Recipient","Inverted","email")

class NetSerializer(serializers.ModelSerializer):
	link = LinkModelSerializer(read_only=True,source="link_encrypt",many=True) #encrypt1 = by sender
	node = NodeModelSerializer(read_only=True,source="node_encrypt",many=True) 
	email = EmailSerializer(read_only=True,source="email_encrypt",many=True)
	class Meta:
		model = NetModel
		fields = ("ModelKey","ModelType","node","link","email")
		

#3d modeling
class Viz3dSerializer(serializers.ModelSerializer):

	class Meta:
		model = Visual3D
		fields = ("Name","Xvalue","Yvalue","Zvalue","Attribute1","Attribute2")
		
