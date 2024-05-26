FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /app

ADD . /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app 

# Copy the service_account.json to the correct location
COPY service_account.json /app/fitness-app/home/service_account.json

# Define build arguments and environment variables
ARG GMAIL_PASS
ARG MONGO_DB_NAME
ARG MONGO_DB_HOST
ARG MONGO_DB_USER
ARG MONGO_PASS

ENV GMAIL_PASS=$GMAIL_PASS
ENV MONGO_DB_NAME=$MONGO_DB_NAME
ENV MONGO_DB_HOST=$MONGO_DB_HOST
ENV MONGO_DB_USER=$MONGO_DB_USER
ENV MONGO_PASS=$MONGO_PASS

# Expose port 8000 for the Django application
EXPOSE 8000

# Run the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
