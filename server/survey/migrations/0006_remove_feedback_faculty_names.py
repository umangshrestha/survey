# Generated by Django 4.1.2 on 2022-10-24 22:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0005_alter_feedback_additional_comments_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedback',
            name='faculty_names',
        ),
    ]