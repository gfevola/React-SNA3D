# Generated by Django 3.1.1 on 2021-01-23 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('NLP', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobTitles',
            fields=[
                ('JobCode', models.CharField(max_length=120, primary_key=True, serialize=False)),
                ('JobTitle', models.CharField(max_length=500)),
                ('Description', models.TextField()),
            ],
        ),
        migrations.DeleteModel(
            name='JobDescription',
        ),
    ]
