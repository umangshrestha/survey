# Generated by Django 4.0.7 on 2022-10-24 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0004_faculty_rename_workshop_feedback_workshop_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='additional_comments',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='changes_suggested',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='topics_for_future',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='useful_idea',
            field=models.TextField(blank=True),
        ),
    ]