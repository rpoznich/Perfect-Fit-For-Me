from flask import Flask, jsonify, render_template
from flask_cors import CORS, cross_origin
from models import City, Job, Event, application, db
import json
import requests

cors = CORS(application)

#------------------#
# DATABASE QUERIES #
#------------------#
def query_jobs(): 
    jobs = {"Jobs":[]}
    job_objs = Job.query.all() 
    for j in job_objs: 
        jobs["Jobs"].append(j.toDict())
    return jobs

def query_jobs_by_id(identifier): 
    j = Job.query.get(identifier)
    return j.toDict()

def query_jobs_by_city(city): 
    job_objs = Job.query.filter_by(city_name=city).all()
    jobs = {"Jobs":[]}
    for j in job_objs:
        jobs["Jobs"].append(j.toDict())
    return jobs

def query_cities(): 
    cities = {}
    city_objs = City.query.all()
    for c in city_objs: 
        name = c.name
        cities[name] = c.toDict()
    return cities

def query_cities_by_state(state):
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
@application.route('/api/')
@cross_origin()
def render_home_page():
    return render_template('home.html')

@application.route('/api/events')
@cross_origin()
def get_events():
    events = Event.query.all()
    return jsonify([e.json() for e in events])

@application.route('/api/jobs')
@cross_origin()
def get_jobs(): 
    return jsonify(query_jobs())

@application.route('/api/jobs/id/<id>')
@cross_origin()
def get_one_job_by_id(id):
    return jsonify(query_jobs_by_id(id))

@application.route("/api/jobs/city/<city>")
@cross_origin()
def get_jobs_by_city(city): 
    return jsonify(query_jobs_by_city(city))

@application.route('/api/cities')
@cross_origin()
def get_cities():
    return jsonify(query_cities())

@application.route('/api/cities/state/<state>')
@cross_origin()
def get_cities_by_state(state):
    return jsonify(query_cities_by_state(state))

@application.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

if __name__ == '__main__': 
	application.run()