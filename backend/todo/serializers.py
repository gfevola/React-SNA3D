from rest_framework import serializers
from .models import Todo, Report, Demo, Hires, ModelCols, Employee, Employee_State
from NLP.models import JobTitles
from NLP.serializers import JDSerializer

class TodoSerializer(serializers.ModelSerializer):

    department = serializers.ChoiceField(choices=Todo.DEPARTMENT_CHOICES)

    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'department','completed')
		
		
class DemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demo
        fields = ('id', 'Report', 'EmpID','Name', 'JobTitle', 'Salary','Department','Location')
		
		
class HireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hires
        fields = ('id', 'Report', 'HireDate','Name', 'JobTitle', 'Salary','Department','Location')

class EmployeeStateSerializer(serializers.ModelSerializer):

	#jc = JDSerializer(read_only=True,source="jobcode_enc",many=True)

	class Meta:
		model = Employee_State
		fields = ("EmpID","ModelKey","Date","Salary","Department","Location","ServiceLine","JobCode","Embedding1","Embedding2")
			
class EmployeeSerializer(serializers.ModelSerializer):

	state = EmployeeStateSerializer(read_only=True,source="encryptEmp",many=True)

	class Meta:
		model = Employee
		fields = ("EmpID","Name","CreateDate","EmailAddress","state")

class ReportSerializer(serializers.ModelSerializer):
	demo = DemoSerializer(read_only=True,source="encrypt1",many=True)
	hire = DemoSerializer(read_only=True,source="encrypt2",many=True)
	
	class Meta:
		model = Report
		fields = ("Report_Key","Report_Date","Report_Type","demo","hire")


class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelCols
        fields = ('ReportName','ColumnName','FieldType')

