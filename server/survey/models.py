from django.db import models


class Workshop(models.Model):
    id = models.AutoField(primary_key=True)
    workshop = models.TextField(unique=True)

    def __str__(self):
        return self.workshop


class Faculty(models.Model):
    id = models.AutoField(primary_key=True)
    faculty = models.TextField(unique=True)

    def __str__(self):
        return self.faculty


class Feedback(models.Model):
    id = models.AutoField(primary_key=True)
    faculty_names = models.TextField()
    useful_idea = models.TextField()
    changes_suggested = models.TextField()
    topics_for_future = models.TextField()
    additional_comments = models.TextField()
    rating = models.IntegerField()
    date = models.DateTimeField()
    faculty = models.ForeignKey(
        Faculty, blank=True, on_delete=models.CASCADE)
    workshop = models.ForeignKey(
        Workshop, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id}"
