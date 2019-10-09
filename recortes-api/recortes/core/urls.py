
from django.urls import path
from django.conf.urls import include

from rest_framework import routers
from .views import RecorteViewSet


router = routers.DefaultRouter()
router.register('recortes', RecorteViewSet, base_name='recortes')

core_patterns = [
    path('', include(router.urls)),
]
