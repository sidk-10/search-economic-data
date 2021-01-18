import os
from flask import Flask
from flask_restful import Api
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'some_secret_key'
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}},
            allow_headers=["Content-Type"], intercept_exceptions=False)


@app.route('/')
def index():
    return "API is Live!"

if __name__ == "__main__":
    app.run(debug=True)