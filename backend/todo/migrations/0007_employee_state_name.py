# Generated by Django 3.1.1 on 2021-01-24 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0006_auto_20210124_0843'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee_state',
            name='Name',
            field=models.CharField(default='N/A', max_length=200),
        ),
    ]
