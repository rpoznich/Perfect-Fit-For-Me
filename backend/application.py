from flask import Flask, jsonify, render_template
from flask_cors import CORS, cross_origin
from models import City, Job, Event, application, db
import json
import requests

cors = CORS(application)

#------------------#
# DATABASE QUERIES #
#------------------#
def query_events():
    events = Event.query.all()
    return [e.json() for e in events]

def query_events_by_page(num):
    num = int(num)
    events = []
    for i in range(((num-1)*9+1), num*9+1):
        event = Event.query.get(i)
        if event is not None:
            events.append(event.json())
        else:
            return events
    return events

def query_jobs(): 
    jobs = {"Jobs":[]}
    job_objs = Job.query.all() 
    for j in job_objs: 
        jobs["Jobs"].append(j.toDict())
    return jobs

def query_jobs_by_id(identifier): 
    j = Job.query.get(identifier)
    return j.toDict()

def query_jobs_by_page(num):
    num = int(num)
    jobs = []
    for i in range(((num-1)*9+1), num*9+1):
        job = Job.query.get(i)
        if job is not None:
            jobs.append(job.toDict())
        else:
            return jobs
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

def query_cities_by_page(num):
    num = int(num)
    cities = []
    for i in range(((num-1)*9+1), num*9+1):
        city = City.query.get(i)
        if city is not None:
            cities.append(city.toDict())
        else:
            return cities
    return cities

#---------------# 
# FILTER/SEARCH #
#---------------# 
@application.route("/filter/")
@cross_origin() 
def filter_results(): 
    model = request.args.get('m')
    if model == 'jobs': 
        # ADD ATTRIBUTES AS NECESSARY # 
        income = request.args.get('i')
        location = request.args.get('loc') 
        jobs = None
        if income is not None and location is not None: 
            # DO QUERY IN DATABASE WHERE JOBS POTENTIAL INCOME IS > CASH SIGN # 
            # NEED TO FIGURE OUT WHAT A CASH SIGN MEANS IN TERMS OF VALUES 
            salary = 30000 # SOME FILLER UNTIL I FIGURE OUT WHAT A CASH SIGN MEANS 
            loc = location.split(",")[0]
            jobs = Job.query.filter_by(salary>=salary).all() # Can't really filter by location since job doesn't give that info
        elif income is not None: 
            salary = 30000
            jobs = Job.query.filter_by(salary>=salary).all()
        elif location is not None: 
            loc = location.split(",")[0]
            jobs = Job.query.filter_by().all()
    elif model == 'cities': # May Need to add average score to filter by average score
        cost_of_living = request.args.get('col') 
        # avg_score = request.get.args.get('avg')
        cities = None
        if cost_of_living is not None: 
            col = 4 # Not sure what the Cash sign means again - is it more expensive/less expensive? 
            cities = City.query.filter_by(col >= 4).all()
    elif model == 'events':
        location = request.args.get('loc')
        events = None
        if location is not None: 
            loc = location.split(",")[0]
            events = Event.query.filter_by(city=loc).all()
    else assert(False) # Just to debug and check if proper input is given

@application.route("/search/")
@cross_origin() 
def search_results():


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
    return jsonify(query_events())

@application.route('/api/events/page/<num>')
@cross_origin()
def get_events_by_page(num):
    return jsonify(query_events_by_page(num))

@application.route('/api/jobs')
@cross_origin()
def get_jobs(): 
    return jsonify(query_jobs())

@application.route('/api/jobs/id/<id>')
@cross_origin()
def get_one_job_by_id(id):
    return jsonify(query_jobs_by_id(id))

@application.route('/api/jobs/page/<num>')
@cross_origin()
def get_jobs_by_page(num):
    return jsonify(query_jobs_by_page(num))

@application.route('/api/cities')
@cross_origin()
def get_cities():
    return jsonify(query_cities())

@application.route('/api/cities/state/<state>')
@cross_origin()
def get_cities_by_state(state):
    return jsonify(query_cities_by_state(state))

@application.route('/api/cities/page/<num>')
@cross_origin()
def get_cities_by_page(num):
    return jsonify(query_cities_by_page(num))

@application.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

if __name__ == '__main__': 
	application.run()