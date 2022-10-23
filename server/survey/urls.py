from django.urls import path, include
from rest_framework import routers

from .views import FeedbackViewSet, WorkshopViewSet, FacultyViewSet


router = routers.DefaultRouter()
router.register(r'feedback', FeedbackViewSet)
router.register(r'workshop', WorkshopViewSet)
router.register(r'faculty', FacultyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
