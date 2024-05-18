import pymongo
from home.config import mongo_pass

url = "mongodb+srv://malikshahzaib606:" + mongo_pass + "@fof.shptlgq.mongodb.net/?retryWrites=true&w=majority"

client = pymongo.MongoClient(url)

db = client['fofdb']