from googleapiclient.discovery import build
from google.oauth2 import service_account

SCOPES = ['https://www.googleapis.com/auth/drive']
SERVICE_ACCOUNT_FILE = 'service_account.json'  # Adjust this path if needed
PARENT_FOLDER_ID = '1mTyg7PBotG4onaZ7RKLEPatTro-EHvSo'

def authenticate():
    creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return creds

def upload(file_path):
    creds = authenticate()
    service = build('drive', 'v3', credentials=creds)

    file_metadata = {
        'name': 'Hello1',
        'parents': [PARENT_FOLDER_ID]
    }

    # Ensure file_path points to the correct location of your file
    media = MediaFileUpload(file_path, resumable=True)

    file = service.files().create (
        body=file_metadata,
        media_body=media
    ).execute()

def list_files():
    creds = authenticate()
    service = build('drive', 'v3', credentials=creds)

    # Retrieve a list of files
    results = service.files().list(pageSize=10).execute()
    files = results.get('files', [])

    if not files:
        print('No files found.')
    else:
        print('Files:')
        for file in files:
            print(f"{file['name']} ({file['id']})")
