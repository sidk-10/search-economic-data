from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient("mongodb+srv://admin:{}@cluster0.d5azx.mongodb.net/{}?retryWrites=true&w=majority".format(os.environ["PASSWORD"], os.environ["DATABASE"]), ssl=True,ssl_cert_reqs='CERT_NONE')
db = client["economic-data"]