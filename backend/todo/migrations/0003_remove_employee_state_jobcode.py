# Generated by Django 3.1.1 on 2021-01-24 00:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_employee_state'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee_state',
            name='JobCode',
        ),
    ]