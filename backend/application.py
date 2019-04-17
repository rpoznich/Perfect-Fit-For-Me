from flask import Flask, jsonify, render_template, request
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
    jobs = {"Jobs":[]}
    all_jobs = query_jobs()["Jobs"]
    for i in range(((num-1)*9), num*9):
        if i >= len(all_jobs):
            break
        job = all_jobs[i]
        jobs["Jobs"].append(job)
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
    all_cities = query_cities() 
    city_names = all_cities.keys()
    cities = {}
    for i in range(((num-1)*9), num*9):
        if i >= len(city_names):
            break
        name = city_names[i]
        cities[name] = all_cities[name]
    return cities

#---------------# 
# FILTER/SEARCH #
#---------------# 
def query_filter_by_page(query_results, num): 
    num = int(num)
    results = [] 
    for i in range(((num-1)*9), num*9):
        if (i >= len(query_results)): 
            break 
        obj = query_results[i] 
        if type(obj) is Job or type(obj) is City:
            results.append(obj.toDict())
        elif type(obj) is Event: 
            results.append(obj.json())
    return results

@application.route("/filter/")
@cross_origin() 
def filter_results(): 
    model = request.args.get('m')
    page = request.args.get('p')
    results = None
    response = None
    if model == 'jobs': 
        # ADD ATTRIBUTES AS NECESSARY # 
        income = request.args.get('i')
        location = request.args.get('loc')
        education = request.args.get('edu') 
        jobs_query = None
        if income is not None and location is not None: 
            # DO QUERY IN DATABASE WHERE JOBS POTENTIAL INCOME IS > CASH SIGN # 
            # NEED TO FIGURE OUT WHAT A CASH SIGN MEANS IN TERMS OF VALUES 
            #salary = 90000 # SOME FILLER UNTIL I FIGURE OUT WHAT A CASH SIGN MEANS 
            loc = location.split(",")[0]
            jobs_query = Job.query.filter(Job.salary >= 90000).all() # Can't really filter by location since job doesn't give that info
        elif income is not None: 
            #salary = 90000
            jobs_query = Job.query.filter(Job.salary >= 90000).all()
        elif education is not None: 
            if (education == 'bac'):
                jobs_query = Job.query.filter_by(education="Bachelor's degree").all()
            if (education == 'mas'): 
                jobs_query = Job.query.filter_by(education="Master's degree").all()
        response = jsonify(query_filter_by_page(jobs_query,page))



    elif model == 'cities': # May Need to add average score to filter by average score
        cost_of_living = request.args.get('col') 
        population = request.args.get('pop')
        # avg_score = request.get.args.get('avg')
        cities = None
        if cost_of_living is not None: 
            col = 4 # Not sure what the Cash sign means again - is it more expensive/less expensive? 
            cities = City.query.filter_by(col >= 4).all()
        elif population is not None: 
            if population == 1:
                cities = City.query.filter_by(population<=200000).all()
            elif population == 2: 
                cities = City.query.filter_by(population > 200000, population < 999999).all()
            elif population == 3:
                cities = City.query.filter_by(population >= 1000000).all()
        response = jsonify(query_filter_by_page(cities,page))

    elif model == 'events':
        location = request.args.get('loc')
        events = None
        if location is not None: 
            loc = location.split(",")[0]
            events = Event.query.filter_by(city=loc).all()
        response = jsonify(query_filter_by_page(events))
    else: 
        assert(False) # Just to debug and check if proper input is given

    return response

@application.route("/api/<model>/search/<query>")
@cross_origin() 
def search_results(model, query):
    if model == 'events':
        events = Event.query
        events = events.filter(Event.name.like('%' + query + '%'))
        return jsonify([e.json() for e in events])
    elif model == 'jobs':
        jobs = Job.query
        jobs = jobs.filter(Job.job_title.like('%' + query + '%'))
        return jsonify([j.toDict() for j in jobs])
    elif model == 'cities':
        cities = City.query
        cities = cities.filter(City.name.like('%' + query + '%'))
        return jsonify([c.toDict() for c in cities])
    else:
        return "Invalid model: " + str(model)

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