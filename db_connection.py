import pymongo
import os

mongo_pass = os.environ.get('MONGO_PASS')

url = f"mongodb+srv://malikshahzaib606:{mongo_pass}@fof.shptlgq.mongodb.net/?retryWrites=true&w=majority"

client = pymongo.MongoClient(url)

db = client['fofdb']
