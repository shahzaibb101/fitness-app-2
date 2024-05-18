from django.core.mail import EmailMessage
from django.conf import settings
from .models import NewTrainers

def send_email(name, my_email, cv):
    subject = "New Trainer Registration!"
    message = "Trainer Name: " + name
    message+= "\n"
    message+= "Trainer Email: " + my_email
    from_email = settings.EMAIL_HOST_USER
    recipient_list = ["malikshahzaib606@gmail.com"]

    email = EmailMessage(subject, message, from_email, recipient_list)
    email.attach(cv.name, cv.read(), cv.content_type)
    email.send()

    data = {
        "email": my_email
    }

    NewTrainers.insert_one(data)
