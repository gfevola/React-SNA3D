# Generated by Django 3.1.1 on 2021-01-23 17:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('NLP', '0002_auto_20210123_1117'),
    ]

    operations = [
        migrations.CreateModel(
            name='Embedding_2',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Embed1Val', models.DecimalField(decimal_places=6, default=0, max_digits=10)),
                ('Embed2Val', models.DecimalField(decimal_places=6, default=0, max_digits=10)),
                ('ModelKey', models.ForeignKey(default='N/A', on_delete=django.db.models.deletion.CASCADE, related_name='embed2', to='NLP.jobtitles')),
            ],
        ),
    ]