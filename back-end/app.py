
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
import json
import requests
import citiesExtract
import dbwriter


app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://perfectfit:theozonelair@mysql-db-instance.chdg6as3bxgl.us-east-2.rds.amazonaws.com:3306/perfectfitdb'
db = SQLAlchemy(app)

@app.route('/') 
def get_default(): 
	return 'Welcome to the back-end' 

@app.route('/api/events')
def get_events():
    events = dbwriter.Event.query.all()
    return jsonify([e.json() for e in events])

@app.route('/api/cities')
def get_cities():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, 'static', 'json','cities.json')
    data = json.load(open(json_url))
    return jsonify(data) #"In development. PLEASE COME BACK LATER"

if __name__ == '__main__': 
	app.run()