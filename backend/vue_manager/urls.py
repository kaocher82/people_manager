from django.urls import path
from vue_manager import views
from django.conf.urls import include

app_name = 'vue_manager'
urlpatterns = [
    path('people/', views.people_list),
    path('people/<int:pk>', views.person_detail)
]
