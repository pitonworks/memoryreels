# Generated by Django 5.1 on 2024-08-12 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('media_upload', '0002_rename_created_at_mediafile_uploaded_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='mediafile',
            name='media_type',
            field=models.CharField(choices=[('image', 'Image'), ('video', 'Video')], default='image', max_length=10),
        ),
    ]
