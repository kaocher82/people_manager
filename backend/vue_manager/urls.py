from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from vue_manager import views

app_name = 'vue_manager'
urlpatterns = [
    path('', views.PersonList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
