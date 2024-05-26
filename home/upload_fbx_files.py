from google.oauth2 import service_account
from googleapiclient.discovery import build
import io
from googleapiclient.http import MediaIoBaseUpload
from django.http import HttpResponse, JsonResponse
from fof.settings import SERVICE_ACCOUNT_FILE

SCOPES = ['https://www.googleapis.com/auth/drive']
PARENT_FOLDER_ID = '1mTyg7PBotG4onaZ7RKLEPatTro-EHvSo'  # Replace with your Google Drive folder ID

def authenticate():
    creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return creds

def upload_file_to_drive(file, file_name, type):
    try:
        creds = authenticate()
        service = build('drive', 'v3', credentials=creds)

        file_metadata = {
            'name': file_name + type,
            'parents': [PARENT_FOLDER_ID]
        }

        media = MediaIoBaseUpload(file, mimetype='application/octet-stream', resumable=True)

        file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        return file.get('id')

    except Exception as e:
        print('Error uploading file to Google Drive:', str(e))

def retrieve_file_from_drive(file_name):
    try:
        creds = authenticate()
        service = build('drive', 'v3', credentials=creds)

        # Search for the file with the specified name
        response = service.files().list(
            q=f"name='{file_name}.fbx' and '{PARENT_FOLDER_ID}' in parents",
            fields='files(id)'
        ).execute()

        # Get the file ID if the file exists
        files = response.get('files', [])
        if files:
            file_id = files[0]['id']

            # Download the file content
            request = service.files().get_media(fileId=file_id)
            file_content = request.execute()

            return file_content

        else:
            print(f"File '{file_name}.fbx' not found in Google Drive.")
            return None

    except Exception as e:
        print('Error retrieving file from Google Drive:', str(e))
        return None

my_file = retrieve_file_from_drive("65f5af52b04fa9c70c626dfd")
