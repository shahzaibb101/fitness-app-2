from django.db import models
from db_connection import db

# Create your models here.

Users = db['Users']
NewTrainers = db['NewTrainers']
Trainers = db['Trainers']
RecommendedPlans = db['RecommendedPlans']
ActivePlans = db['ActivePlans']
UserRequests = db['UserRequests']