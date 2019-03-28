
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
import json
import requests
import citiesExtract
import dbwriter
import models


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


@app.route('/api/jobs')
def get_jobs(): 
	jobs = models.get_jobs()
	return jsonify(jobs)

@app.route('/api/jobs/id/<id>')
def get_one_job_by_id(id):
	return jsonify(models.get_one_job_by_id(id))

@app.route("/api/jobs/city/<city>")
def get_jobs_by_city(city): 
	return jsonify(models.get_jobs_by_city(city))


@app.route('/api/cities')
def get_cities():
    cities = models.get_cities()
    return jsonify(cities) #"In development. PLEASE COME BACK LATER"

if __name__ == '__main__': 
	app.run()