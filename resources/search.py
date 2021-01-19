from flask import request
from flask_restful import Resource, reqparse
from webargs import fields
from webargs.flaskparser import use_args, parser, abort
from db import db
from pprint import pprint
from bson.json_util import dumps
import json

class Search(Resource):
    search_args = {
        "query": fields.String(required=True),
    }

    @use_args(search_args, location="query")
    def get(self, args):
        response = []
        try: 
            collection = db["collection1"]
            response = list(collection.find({"$text": {"$search": args["query"]}}))
            response = json.loads(dumps(response))
        except Exception as error:
            print(error)
        print(len(response))
        return response