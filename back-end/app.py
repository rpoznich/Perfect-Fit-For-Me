
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
import json
import requests
import citiesExtract
import dbwriter
import models
from flask_cors import CORS, cross_origin 

# import dbwriter
# import models

app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://perfectfit:theozonelair@mysql-db-instance.chdg6as3bxgl.us-east-2.rds.amazonaws.com:3306/perfectfitdb'
db = SQLAlchemy(app)

@app.route('/api/events')
@cross_origin()
def get_events():
    events = dbwriter.Event.query.all()
    return jsonify([e.json() for e in events])

@app.route('/api/jobs')
@cross_origin()
def get_jobs(): 
	jobs = models.get_jobs()
	return jsonify(jobs)

@app.route('/api/jobs/id/<id>')
@cross_origin()
def get_one_job_by_id(id):
	return jsonify(models.get_one_job_by_id(id))

@app.route("/api/jobs/city/<city>")
@cross_origin()
def get_jobs_by_city(city): 
	return jsonify(models.get_jobs_by_city(city))

@app.route('/api/cities')
@cross_origin()
def get_cities():
    cities = models.get_cities()
    return jsonify(cities)

@app.route('/api/cities/state/<state>')
@cross_origin()
def get_cities_by_state(state):
	return jsonify(models.get_cities_by_state(state))

@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Credentials', 'true')
	return response

if __name__ == '__main__': 
	app.run()