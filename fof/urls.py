"""
URL configuration for fof project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from home.views import today_activity_chart_data
from home.views import weekly_activity_chart_data
from home.views import monthly_activity_chart_data
from home.views import weekly_achieved_chart_data
from home import views
from home.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"),
    path('cms/', cms, name="cms"),
    path('upload-fbx/', upload_fbx, name="upload_fbx"),
    path('upload-csv/', upload_csv, name="upload_csv"),
    path('fetch-fbx-file/', fetch_fbx_file, name="fetch_fbx"),
    path('serve-csv/', serve_csv, name="serve_csv"),
    path('show-trainers/', show_trainers, name="show_trainers"),
    path('add-trainer-to-user/', add_trainer_to_user, name="add_trainer_to_user"),
    path('sign-in/', sign_in, name="sign_in"),
    path('signin-trainer/', signin_trainer, name="sign_in_trainer"),
    path('sign-up/', sign_up, name="sign_up"),
    path('signup-trainer/', signup_trainer, name="sign_up_trainer"),
    # path('trainer-dashboard/', trainer, name="trainer_dashboard"),
    path('activity/', views.activity, name='activity'),
    path('today_activity_chart_data/', today_activity_chart_data, name='today_activity_chart_data'),
    path('weekly_activity_chart_data/', weekly_activity_chart_data, name='weekly_activity_chart_data'),
    path('monthly_activity_chart_data/', monthly_activity_chart_data, name='monthly_activity_chart_data'),
    path('chart/', chart, name="chart"),
    path('weekly_achieved_chart_data/', weekly_achieved_chart_data, name='weekly_achieved_chart_data'),
    path('monthly-line-graph-data/<int:year>/<int:month>/', monthly_line_graph_data, name='monthly_line_graph_data'),
    path('chat/', chat, name="chat"),
    path('settings/', settings, name="settings"),
    path('add-user/', add_user, name="add_user"),
    path('trainer_dashboard/', trainer_dashboard, name="trainer_dashboard"),
    path('active_client/', active_client, name="active_client"),
    path('serve-image/<str:user_id>', serve_image, name="serve_image"),
    path('show-client-info/', show_client_info, name="show_client_info"),
    path('workout_plan/', workout_plan, name="workout_plan"),
    path('diets/', diets, name="diets"),
    path('trainer_chat/', trainer_chat, name="trainer_chat"),
    path('trainer-chart/', trainer_chart, name="trainer_chart"),
    path('trainer-settings/', trainer_settings, name="trainer_settings"),
    path('rehab/', rehab, name="rehab"),
    path('my-workout-plan/', my_workout_plan, name="my_workout_plan"),
    path('my-diet/', my_diet, name="my_diet"),
    path('my-requests/', my_requests, name="my_requests"),
    path('new-requests/', new_requests, name="new_requests"),

    path('fill-data/', fill_data, name="fill_data"),
]