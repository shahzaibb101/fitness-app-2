from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.contrib.sessions.models import Session
from django.utils import timezone
import json
from datetime import datetime, timedelta
import random
from .models import Users, Trainers, RecommendedPlans, ActivePlans, UserRequests
from .send_email import send_email
from .models import NewTrainers
from .upload_fbx_files import upload_file_to_drive, authenticate, PARENT_FOLDER_ID
from google.oauth2 import service_account
from googleapiclient.discovery import build
import io
from googleapiclient.http import MediaIoBaseUpload
from gridfs_storage.storage import GridFSStorage
import bson.binary
from bson import ObjectId
import string
from .fill_data import fill

# Create your views here.

def home(request):
    return render(request, "home.html")

def user_dashboard(request):
    return render(request, "user_dashboard.html")

def cms(request):
    name = request.GET.get('name')
    user = request.session.get('existing_document', None)
    print("in cms: ", user['hasFbxFile'])
    if user['hasFbxFile'] == "true":
        hasFbxFile = True
    else:
        hasFbxFile = False
    if user['hasCsvFile'] == "true":
        hasCsvFile = True
    else:
        hasCsvFile = False
    print("hasFbxFile: ", user['hasFbxFile'])
    split = name.split()
    first_name = split[0]
    return render(request, "cms.html", {'name': name, 'first_name': first_name, 'hasFbxFile': hasFbxFile, 'hasCsvFile': hasCsvFile, 'user_id': user['_id'], 'user_email': user['email']})

def sign_in(request):
    if request.method == 'POST':
        data = request.POST
        email = data['email']
        password = data['password']
        existing_document = Users.find_one({'email': email})
        if existing_document is not None:
            if check_password(password, existing_document['password']):
                name = existing_document['name']
                existing_document['_id'] = str(existing_document['_id'])
                session_document = {key: value for key, value in existing_document.items() if key != 'photo'}
                request.session['existing_document'] = session_document
                return redirect('/cms/?name=' + name)
            else:
                return HttpResponse('email or password incorrect')
        else:
            return HttpResponse('email or password incorrect')
        
    else:
        return render(request,"sign_in.html")
    
def signin_trainer(request):
    if request.method == 'POST':
        data = request.POST
        email = data['email']
        password = data['password']
        existing_document = Trainers.find_one({'email': email})
        if existing_document is not None:
            if password == existing_document['password']:
                name = existing_document['name']
                existing_document['_id'] = str(existing_document['_id'])
                request.session['existing_document'] = existing_document
                return redirect('/trainer_dashboard/?name=' + name)
            else:
                return HttpResponse('email or password incorrect')
        else:
            return HttpResponse('email or password incorrect')
    else:
        return render(request,"sign_in_trainer.html")

def sign_up(request):
    if request.method == 'POST':
        data = request.POST
        email = data['email']
        existing_document = Users.find_one({'email': email})
        if existing_document is not None:
            return render(request,"sign_up.html")
        else:
            name = data['name']
            password = data['password']
            hashed_password = make_password(password)
            my_img = request.FILES['my_img']
            with my_img.open('rb') as f:
                image_data = f.read()
            binary_data = bson.binary.Binary(image_data)


            data = {
                "name": name,
                "email": email,
                "password": hashed_password,
                "photo": binary_data,
                "hasFbxFile": "false",
                "hasCsvFile": "false",
                "trainer_id": "null"
            }
            Users.insert_one(data)               
            
            return redirect('/sign-in/')
  
    else:
        return render(request,"sign_up.html")
    
def signup_trainer(request):
    if request.method == 'POST':
        data = request.POST
        name = data['name']
        email = data['email']
        cv = request.FILES['cv']
        print(cv)
        existing_document = NewTrainers.find_one({'email': email})
        if existing_document is not None:
            return HttpResponse("Request Already Submitted.")
        send_email(name, email, cv)
        return HttpResponse("Email Sent.")
    else:
        return render(request, "sign_up_trainer.html")

def add_user(request):
    records = {
        "first_name": "Shah",
        "last_name": "Zaib"
    }
    Users.insert_one(records)
    return HttpResponse("Added")

def trainer(request):
    return render(request, "trainer.html")

def activity(request):
    user = request.session.get('existing_document', None)
    name = user['name']
    if user['hasCsvFile'] == "true":
        hasCsvFile = True
    else:
        hasCsvFile = False
    return render(request, "activity.html", {'name': name, 'hasCsvFile': hasCsvFile, 'user_id': user['_id'], 'user_email': user['email']})

def today_activity_chart_data(request):
    today_activity = [80, 90, 23, 100, 40, 80, 15, 30]
    day_time = ["10:24", "13:23", "14:12", "16:01", "17:54", "18:23", "20:20", "21:00"]
    # For goal completion percentage
    today_goal_completion_percentage = 90

    data = {
        'today_activity': today_activity,
        'day_time': day_time,
        'today_goal_completion_percentage': today_goal_completion_percentage
    }

    return JsonResponse(data)

def weekly_activity_chart_data(request):
    weekly_activity = [50, 80, 20, 70, 60, 90, 10, 27]
    week_days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON"]
    # For goal completion percentage
    weekly_goal_completion_percentage = 70

    data = {
        'weekly_activity': weekly_activity,
        'week_days': week_days,
        'weekly_goal_completion_percentage': weekly_goal_completion_percentage
    }

    return JsonResponse(data)

def monthly_activity_chart_data(request):
    monthly_activity_chart = [10, 30, 40, 50, 70, 20, 80, 50]
    months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"]
    # For goal completion percentage
    monthly_goal_completion_percentage = 80

    data = {
        'monthly_activity_chart': monthly_activity_chart,
        'months': months,
        'monthly_goal_completion_percentage': monthly_goal_completion_percentage
    }

    return JsonResponse(data)

def chart(request):
    user = request.session.get('existing_document', None)
    name = user['name']
    if user['hasCsvFile'] == "true":
        hasCsvFile = True
    else:
        hasCsvFile = False
    return render(request, "chart.html", {'name': name, 'hasCsvFile': hasCsvFile, 'user_id': user['_id'], 'user_email': user['email']})

def trainer_chart(request):
    trainer = request.session.get('existing_document', None)
    name = trainer['name']
    return render(request, "trainer_chart.html", {'name': name})

def weekly_achieved_chart_data(request):
    weekly_achieved_activity = [40, 20, 50, 20]
    week_days_chart = ["MON", "TUE", "WED", "THU"]
    # For goal achieved percentage
    weekly_goal_achieved_percentage = 65

    data = {
        'weekly_achieved_activity': weekly_achieved_activity,
        'week_days_chart': week_days_chart,
        'weekly_goal_achieved_percentage': weekly_goal_achieved_percentage
    }

    return JsonResponse(data)

def monthly_line_graph_data(request, year, month):
    # Determine the first and last days of the month
    first_day = datetime(year, month, 1)
    last_day = datetime(year, month, 1) + timedelta(days=32) - timedelta(days=1)

    # Generate sample data for each week within the month
    data = []
    current_day = first_day
    while current_day <= last_day:
        # Get the end of the week
        end_of_week = current_day + timedelta(days=(6 - current_day.weekday()))
        # Calculate the average value for the week (for demonstration)
        week_values = [random.randint(1, 100) for _ in range((end_of_week - current_day).days + 1)]
        avg_value = sum(week_values) / len(week_values)
        data.append((current_day.strftime("%Y-%m-%d"), avg_value))
        # Move to the start of the next week
        current_day = end_of_week + timedelta(days=1)

    # Formatting data for Chart.js
    labels = []
    values = []
    for date, value in data:
        labels.append(datetime.strptime(date, "%Y-%m-%d").strftime("%b %d, %Y"))
        values.append(value)

    return JsonResponse(data={
        'labels': labels,
        'values': values,
    })

def chat(request):
    user = request.session.get('existing_document', None)
    name = user['name']
    if user['hasCsvFile'] == "true":
        hasCsvFile = True
    else:
        hasCsvFile = False
    return render(request, "chat.html", {'name': name, 'hasCsvFile': hasCsvFile, 'user_id': user['_id'], 'user_email': user['email']})

def settings(request):
    user = request.session.get('existing_document', None)
    name = user['name']
    if user['hasCsvFile'] == "true":
        hasCsvFile = True
    else:
        hasCsvFile = False
    return render(request, "settings.html", {'name': name, 'hasCsvFile': hasCsvFile, 'user_id': user['_id'], 'user_email': user['email']})

def trainer_settings(request):
    trainer = request.session.get('existing_document', None)
    name = trainer['name']
    return render(request, "trainer_settings.html", {'name': name})
    
def trainer_dashboard(request):
    name = request.GET.get('name')
    trainer = request.session.get('existing_document', None)
    my_users = Users.find({'trainer_id': trainer['_id']}).limit(3)
    my_users = list(my_users)
    for user in my_users:
        user['id'] = user['_id']

    top_client = Users.find_one({'trainer_id': trainer['_id']})
    top_client['id'] = top_client['_id']

    return render(request, "trainer_dashboard.html", {'name': name, 'my_users': my_users, 'top_client': top_client})

def active_client(request):
    trainer = request.session.get('existing_document', None)
    name = trainer['name']
    print(trainer['email'])
    my_users = Users.find({'trainer_id': trainer['_id']})
    my_users = list(my_users)
    for user in my_users:
        user['id'] = user['_id']

    open_req = UserRequests.find({
        '$and': [
            {'trainer_email': trainer['email']},
            {'status': 'open'}
        ]
    })

    working_req = UserRequests.find({
        '$and': [
            {'trainer_email': trainer['email']},
            {'status': 'working'}
        ]
    })

    completed_req = UserRequests.find({
        '$and': [
            {'trainer_email': trainer['email']},
            {'status': 'completed'}
        ]
    })
    
    
    return render(request, "active_client.html", {'my_users': my_users, 'name': name, 'open_req': open_req, 'working_req': working_req, 'completed_req': completed_req})

def show_client_info(request):
    user_email = request.GET.get('user_email', '')
    user = Users.find_one({'email': user_email})
    user_id = user['_id']
    print(user_email)
    return render(request, "show_client_info.html", {'user_id': user_id, 'user_email': user_email})

def workout_plan(request):
    trainer = request.session.get('existing_document', None)
    name = trainer['name']
    print("Workout Plan:", trainer)
    recommedned_plans = RecommendedPlans.find({'trainer_id': trainer['_id']})
    recommedned_plans = list(recommedned_plans)
    active_plans = ActivePlans.find({'trainer_id': trainer['_id']})
    active_plans = list(active_plans)
    return render(request, "workout_plans.html", {'name': name, 'recommedned_plans': recommedned_plans, 'active_plans': active_plans})

def diets(request):
    trainer = request.session.get('existing_document', None)
    name = trainer['name']
    return render(request, "diets.html", {'name': name})

def trainer_chat(request):
    trainer = request.session.get('existing_document', None)
    name = trainer['name']
    return render(request, "trainer_chat.html", {'name': name})

def upload_csv(request):
    if request.method == 'POST':
        data = request.POST
        user_id = data['user_id']
        user_email = data['user_email']
        user = Users.find_one({'email': user_email})
        if user is not None:
            csv = request.FILES.get('csv')
            if csv:
                file_id = upload_file_to_drive(csv, user_id, ".csv")
                if file_id:
                    Users.update_one(
                        {'email': user_email},
                        {'$set': {'hasCsvFile': 'true'}}
                    )
                    name = user['name']
                    user = Users.find_one({'email': user_email})
                    user['_id'] = str(user['_id'])
                    user['photo'] = str(user['photo'])
                    request.session.clear()
                    request.session['existing_document'] = user
                    return redirect('/cms/?name=' + name)


def upload_fbx(request):
    if request.method == 'POST':
        data = request.POST
        user_id = data['user_id']
        user_email = data['user_email']
        user = Users.find_one({'email': user_email})
        if user is not None:
            print(user_id)
            fbx = request.FILES.get('fbx')
            if fbx:
                file_id = upload_file_to_drive(fbx, user_id, ".fbx")
                if file_id:
                    Users.update_one(
                        {'email': user_email},
                        {'$set': {'hasFbxFile': 'true'}}
                    )
                    name = user['name']
                    user = Users.find_one({'email': user_email})
                    user['_id'] = str(user['_id'])
                    user['photo'] = str(user['photo'])
                    request.session.clear()
                    request.session['existing_document'] = user
                    return redirect('/cms/?name=' + name)
                else:
                    return HttpResponse('Failed to upload file to Google Drive')
            else:
                return HttpResponse('No file provided')

def fetch_fbx_file(request):
    if request.method == 'GET':
        user_id = request.GET.get('user_id')
        if user_id:
            try:
                creds = authenticate()
                service = build('drive', 'v3', credentials=creds)

                # Search for the file with the specified name (user_id.fbx) in the specified parent folder
                response = service.files().list(
                    q=f"name='{user_id}.fbx' and '{PARENT_FOLDER_ID}' in parents",
                    fields='files(id)'
                ).execute()

                # Get the file ID if the file exists
                files = response.get('files', [])
                if files:
                    file_id = files[0]['id']

                    # Download the file content
                    request = service.files().get_media(fileId=file_id)
                    file_content = request.execute()

                    # Return the file content as a response
                    return HttpResponse(file_content, content_type='application/octet-stream')
                else:
                    return HttpResponse(f"FBX file '{user_id}.fbx' not found in Google Drive.", status=404)

            except Exception as e:
                return HttpResponse(f"Error retrieving file from Google Drive: {str(e)}", status=500)

        else:
            return HttpResponse("User ID not provided", status=400)
    else:
        return HttpResponse("Method not allowed", status=405)
    
def serve_csv(request):
    user_id = request.GET.get('user_id')
    print("serve user id: ", user_id)
    if user_id:
        try:
            creds = authenticate()
            service = build('drive', 'v3', credentials=creds)

            # Search for the file with the specified name (user_id.fbx) in the specified parent folder
            response = service.files().list(
                q=f"name='{user_id}.csv' and '{PARENT_FOLDER_ID}' in parents",
                fields='files(id)'
            ).execute()

            # Get the file ID if the file exists
            files = response.get('files', [])
            if files:
                file_id = files[0]['id']

                # Download the file content
                request = service.files().get_media(fileId=file_id)
                file_content = request.execute()

                # Return the file content as a response
                return HttpResponse(file_content, content_type='application/octet-stream')
            else:
                return HttpResponse(f"csv file '{user_id}.fbx' not found in Google Drive.", status=404)

        except Exception as e:
            return HttpResponse(f"Error retrieving file from Google Drive: {str(e)}", status=500)  

def show_trainers(request):
    trainers = Trainers.find()
    trainers_list = [trainer for trainer in trainers] 
    serialized_trainers = []
    for trainer in trainers_list:
        trainer['_id'] = str(trainer['_id'])
        serialized_trainers.append(trainer)
    return JsonResponse(serialized_trainers, safe=False)

def add_trainer_to_user(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        trainer_id = request.POST.get('trainer_id')
        email = request.POST.get('email')
        user_email = request.POST.get('user_email')

        print(user_id, trainer_id, email)
        print("user email:", user_email)

        user = Users.find_one({'email': user_email})
        trainer = Trainers.find_one({'email': email})

        # Add the trainer to the user
        Users.update_one(
            {'email': user_email},
            {'$set': {'trainer_id': trainer_id}}
        )

        return JsonResponse({'message': 'Trainer added to user successfully'})

    return JsonResponse({'message': 'Invalid request method'}, status=405)

def serve_image(request, user_id):
    print("Serve Image ID:", user_id)
    print("image user id: ", user_id)
    user_id = ObjectId(user_id)
    user = Users.find_one({'_id': user_id})
    if user:
        print("in........")
        binary_data = user['photo']
        response = HttpResponse(binary_data, content_type='image/jpg')  # Adjust content type as necessary
        return response
    else:
        return HttpResponse("Image not found")
    

def rehab(request):
    user = request.session.get('existing_document', None)
    name = user['name']
    user_email = user['email']
    user_id = user['_id']
    print("Rehab:", user['name'])
    if user['hasCsvFile'] == "true":
        hasCsvFile = True
    else:
        hasCsvFile = False
    
    return render(request, "rehab.html", {'name': name, 'hasCsvFile': hasCsvFile, 'user_id': user_id, 'user_email': user_email})

def my_workout_plan(request):
    user = request.session.get('existing_document', None)
    name = user['name']
    user_email = user['email']
    user_id = user['_id']
    if user['hasCsvFile'] == "true":
        hasCsvFile = True
    else:
        hasCsvFile = False
    
    return render(request, "my_workout_plan.html", {'name': name, 'hasCsvFile': hasCsvFile, 'user_id': user_id, 'user_email': user_email})

def my_diet(request):
    user = request.session.get('existing_document', None)
    name = user['name']
    user_email = user['email']
    user_id = user['_id']
    if user['hasCsvFile'] == "true":
        hasCsvFile = True
    else:
        hasCsvFile = False
    
    return render(request, "my_diet.html", {'name': name, 'hasCsvFile': hasCsvFile, 'user_id': user_id, 'user_email': user_email})

def my_requests(request):
    user = request.session.get('existing_document', None)
    name = user['name']
    user_email = user['email']
    user_id = user['_id']
    if user['hasCsvFile'] == "true":
        hasCsvFile = True
    else:
        hasCsvFile = False

    trainer_id = user['trainer_id']
    my_req = UserRequests.find({'user_email': user['email']})
    
    return render(request, "my_requests.html", {'name': name, 'hasCsvFile': hasCsvFile, 'trainer_id': trainer_id, 'my_req': my_req, 'user_id': user_id, 'user_email': user_email})

def new_requests(request):
    if request.method == 'POST':
        data = request.POST
        description = data['description']
        my_files = request.FILES.getlist('my_files[]')
        file_names = []

        current_date = datetime.now().date()
        current_date = str(current_date)
        print(current_date)
        user = request.session.get('existing_document', None)
        trainer_id = ObjectId(user['trainer_id'])
        trainer = Trainers.find_one({'_id': trainer_id})
        print("Trainer... ", trainer)
        data = {
            "name": user['name'],
            "user_id": user['_id'],
            "trainer_id": user['trainer_id'],
            "user_email": user['email'],
            "trainer_email": trainer['email'],
            "description": description,
            "creation_date": current_date,
            "status": "open"
        }
        user_request = UserRequests.insert_one(data)  
        id = user_request.inserted_id
        print("user_request:", user_request.inserted_id) 

        for file in my_files:
            print("in...")
            file_name_complete = file.name
            file_extension = '.' + file_name_complete.split('.')[-1]
            file_name = '.'.join(file_name_complete.split('.')[:-1])
            file_id = upload_file_to_drive(file, file_name, file_extension)
            if file_id:
                file_names.append(file_name + file_extension)

        UserRequests.update_one(
            {'_id': id},
            {'$set': {'file_names': file_names}}
        )

        user = request.session.get('existing_document', None)
        name = user['name']
        if user['hasCsvFile'] == "true":
            hasCsvFile = True
        else:
            hasCsvFile = False

        trainer_id = user['trainer_id']
        my_req = UserRequests.find({'user_email': user['email']})
        user_email = user['email']
        user_id = user['_id']

        return render(request, "my_requests.html", {'name': name, 'hasCsvFile': hasCsvFile, 'trainer_id': trainer_id, 'my_req': my_req, 'user_id': user_id, 'user_email': user_email})

    else:
        user = request.session.get('existing_document', None)
        name = user['name']
        user_email = user['email']
        user_id = user['_id']
        if user['hasCsvFile'] == "true":
            hasCsvFile = True
        else:
            hasCsvFile = False

        trainer_id = user['trainer_id']
        
        return render(request, "new_requests.html", {'name': name, 'hasCsvFile': hasCsvFile, 'trainer_id': trainer_id, 'user_id': user_id, 'user_email': user_email})

def fill_data(request):
    fill()
    return HttpResponse("Added...")
