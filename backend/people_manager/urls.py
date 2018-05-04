from django.urls import path
from . import views

app_name = 'people_manager'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:id>/', views.show, name='show'),
    path('new/', views.new, name='new'),
    path('search/', views.search, name='search')
]
