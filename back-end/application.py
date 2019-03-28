from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from models import City, Job, Event, application, db
import json
import requests

#------------------#
# DATABASE QUERIES #
#------------------#
def get_jobs(): 
    jobs = {"Jobs":[]}
    job_objs = Job.query.all() 
    for j in job_objs: 
        jobs["Jobs"].append(j.toDict())
    return jobs

def get_one_job_by_id(identifier): 
    j = Job.query.get(identifier)
    return j.toDict()

def get_jobs_by_city(city): 
    job_objs = Job.query.filter_by(city_name=city).all()
    jobs = {"Jobs":[]}
    for j in job_objs:
        jobs["Jobs"].append(j.toDict())
    return jobs

def get_cities(): 
    cities = {}
    city_objs = City.query.all()
    for c in city_objs: 
        name = c.name
        cities[name] = c.toDict()
    return cities

def get_cities_by_state(state):
    cities = {}
    city_objs = City.query.filter_by(state=state).all() 
    print(len(city_objs))
    for c in city_objs: 
        name = c.name
        cities[name] = c.toDict() 
    return cities

#------------#
# API ROUTES #
#------------#
@app.route('/api/events')
def get_events():
    events = Event.query.all()
    return jsonify([e.json() for e in events])

@app.route('/api/jobs')
def get_jobs(): 
    return jsonify(get_jobs())

@app.route('/api/jobs/id/<id>')
def get_one_job_by_id(id):
    return jsonify(get_one_job_by_id(id))

@app.route("/api/jobs/city/<city>")
def get_jobs_by_city(city): 
    return jsonify(get_jobs_by_city(city))

@app.route('/api/cities')
def get_cities():
    return jsonify(get_cities())

@app.route('/api/cities/state/<state>')
def get_cities_by_state(state):
    return jsonify(get_cities_by_state(state))

if __name__ == '__main__': 
	application.run()