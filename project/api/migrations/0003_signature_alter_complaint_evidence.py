# Generated by Django 4.1.6 on 2023-05-23 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_suggestion'),
    ]

    operations = [
        migrations.CreateModel(
            name='Signature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('roll', models.CharField(max_length=200)),
                ('text', models.FileField(upload_to='')),
                ('public', models.FileField(upload_to='')),
                ('signature', models.FileField(upload_to='')),
            ],
        ),
        migrations.AlterField(
            model_name='complaint',
            name='evidence',
            field=models.FileField(upload_to='D:\\psgtech website\\iitbombay\\sample\\project\\sample'),
        ),
    ]