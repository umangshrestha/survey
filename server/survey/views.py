from django.shortcuts import render

from .models import Faculty, Feedback, Workshop
from rest_framework import viewsets

from .serializer import FeedbackSerializer, WorkshopSerializer, FacultySerializer

# Create your views here.


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer


class WorkshopViewSet(viewsets.ModelViewSet):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer


class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
