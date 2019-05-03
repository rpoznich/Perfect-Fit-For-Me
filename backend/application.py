from flask import Flask, jsonify, render_template, request
from flask_cors import CORS, cross_origin
from sqlalchemy import or_
from models import City, Job, Event, application, db
import json
import requests

cors = CORS(application)

# ---------------- #
# DATABASE QUERIES #
# ---------------- #
def query_events():
    events = Event.query.all()
    return [e.toDict() for e in events]


def query_events_by_page(num):
    num = int(num)
    events = []
    all_events = query_events()
    for i in range(((num - 1) * 9), num * 9):
        if i >= len(all_events):
            break
        event = all_events[i]
        events.append(event)
    return events


def query_jobs():
    jobs = {"Jobs": []}
    job_objs = Job.query.all()
    for j in job_objs:
        jobs["Jobs"].append(j.toDict())
    return jobs


def query_jobs_by_id(identifier):
    j = Job.query.get(identifier)
    return j.toDict()


def query_jobs_by_page(num):
    num = int(num)
    jobs = {"Jobs": []}
    all_jobs = query_jobs()["Jobs"]
    for i in range(((num - 1) * 9), num * 9):
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
    city_names = list(all_cities.keys())
    cities = {}
    for i in range(((num - 1) * 9), num * 9):
        if i >= len(city_names):
            break
        name = city_names[i]
        cities[name] = all_cities[name]
    return cities


# ------------------ #
# FILTER/SEARCH/SORT #
# ------------------ #
def query_filter(query_results):
    results = []
    if query_results is None:
        return results
    if type(query_results[0]) is City:
        results = {}
    for i in range(len(query_results)):
        obj = query_results[i]
        if type(obj) is City:
            results[obj.name] = obj.toDict()
        else:
            results.append(obj.toDict())
    return results


def query_filter_by_page(query_results, num):
    results = []
    page = int(num)
    if query_results is None:
        return results
    if type(query_results[0]) is City:
        results = {}
    for i in range((page - 1) * 9, page * 9):
        if i >= len(query_results):
            break
        obj = query_results[i]
        if type(obj) is City:
            results[obj.name] = obj.toDict()
        else:
            results.append(obj.toDict())
    return results


@application.route("/api/<model>/filter/<attr>/<value>/")
@cross_origin()
def filter_results(model, attr, value):
    response = None
    if model == "jobs":
        # ADD ATTRIBUTES AS NECESSARY #
        jobs_query = None
        if attr == "income":
            if value == "1":
                jobs_query = Job.query.filter(Job.salary < 30000).all()
            elif value == "2":
                jobs_query = Job.query.filter(
                    Job.salary >= 30000, Job.salary < 50000
                ).all()
            elif value == "3":
                jobs_query = Job.query.filter(
                    Job.salary >= 50000, Job.salary < 70000
                ).all()
            elif value == "4":
                jobs_query = Job.query.filter(
                    Job.salary >= 70000, Job.salary < 90000
                ).all()
            elif value == "5":
                jobs_query = Job.query.filter(Job.salary >= 90000).all()
        elif attr == "edu":
            if value == "bac":
                jobs_query = Job.query.filter_by(education="Bachelor's degree").all()
            elif value == "mas":
                jobs_query = Job.query.filter_by(education="Master's degree").all()
            elif value == "phd":
                jobs_query = Job.query.filter_by(
                    education="Doctoral or professional degree"
                ).all()
        elif attr == "loc":
            jobs_query = Job.query.filter(
                or_(
                    Job.city1 == value,
                    Job.city2 == value,
                    Job.city3 == value,
                    Job.city4 == value,
                    Job.city5 == value,
                )
            ).all()
        response = jsonify(query_filter(jobs_query))

    elif model == "cities":  # May Need to add average score to filter by average score
        cities = None
        if attr == "col":
            col = 2 * int(value)
            if col <= 2:
                cities = City.query.filter(City.cost_of_living <= 2.0).all()
            elif col <= 4:
                cities = City.query.filter(
                    City.cost_of_living > 2.0, City.cost_of_living <= 4.0
                ).all()
            elif col <= 6:
                cities = City.query.filter(
                    City.cost_of_living > 4.0, City.cost_of_living <= 6.0
                ).all()
            elif col <= 8:
                cities = City.query.filter(
                    City.cost_of_living > 6.0, City.cost_of_living <= 8.0
                ).all()
            elif col <= 10:
                cities = City.query.filter(
                    City.cost_of_living > 8.0, City.cost_of_living <= 10.0
                ).all()
        elif attr == "pop":
            population = value
            if population == "1":
                cities = City.query.filter(City.population <= 200000).all()
            elif population == "2":
                cities = City.query.filter(
                    City.population > 200000, City.population < 999999
                ).all()
            elif population == "3":
                cities = City.query.filter(City.population >= 1000000).all()
        elif attr == "state":
            cities = City.query.filter_by(state=value).all()
        response = jsonify(query_filter(cities))

    elif model == "events":
        events = None
        if attr == "city":
            events = Event.query.filter_by(city=value).all()
        elif attr == "state":
            events = Event.query.filter_by(state=value).all()
        elif attr == "duration":
            if value == "1":
                events = Event.query.filter(Event.duration < 1).all()
            elif value == "2":
                events = Event.query.filter(
                    Event.duration >= 1, Event.duration < 4
                ).all()
            elif value == "3":
                events = Event.query.filter(Event.duration >= 4).all()
        response = jsonify(query_filter(events))
    else:
        assert False  # Just to debug and check if proper input is given

    return response


def search_query(model, query):
    if model == "events":
        events = Event.query
        events = events.filter(
            or_(
                Event.name.like("%" + query + "%"),
                Event.summary.like("%" + query + "%"),
                Event.address.like("%" + query + "%"),
                Event.city.like("%" + query + "%"),
                Event.state.like("%" + query + "%"),
                Event.venue.like("%" + query + "%"),
            )
        )
        return [e for e in events]
    elif model == "jobs":
        jobs = Job.query
        jobs = jobs.filter(
            or_(
                Job.job_title.like("%" + query + "%"),
                Job.description.like("%" + query + "%"),
                Job.education.like("%" + query + "%"),
                Job.city1.like("%" + query + "%"),
                Job.city2.like("%" + query + "%"),
                Job.city3.like("%" + query + "%"),
                Job.city4.like("%" + query + "%"),
                Job.city5.like("%" + query + "%"),
            )
        )
        return [j for j in jobs]
    elif model == "cities":
        cities = City.query
        cities = cities.filter(
            or_(City.name.like("%" + query + "%"), City.state.like("%" + query + "%"))
        )
        return [c for c in cities]
    else:
        return "Invalid model: " + str(model)


@application.route("/api/<model>/search/<query>")
@cross_origin()
def search_results(model, query):
    if model == "jobs" or model == "events":
        return jsonify([m.toDict() for m in search_query(model, query)])
    elif model == "cities":
        return jsonify({m.name: m.toDict() for m in search_query(model, query)})
    elif model == "all":
        events = search_query("events", query)
        jobs = search_query("jobs", query)
        cities = search_query("cities", query)
        return jsonify(
            {
                "events": [e.toDict() for e in events],
                "jobs": [j.toDict() for j in jobs],
                "cities": [c.toDict() for c in cities],
            }
        )
    else:
        return "Invalid model: " + str(model)


@application.route("/api/<model>/search/<query>/<page>")
@cross_origin()
def search_results_page(model, query, page):
    if model == "events" or model == "cities" or model == "jobs":
        return jsonify(
            query_filter_by_page([m for m in search_query(model, query)], page)
        )
    elif model == "all":
        events = search_query("events", query)
        jobs = search_query("jobs", query)
        cities = search_query("cities", query)
        events_page = query_filter_by_page([e for e in events], page)
        jobs_page = query_filter_by_page([j for j in jobs], page)
        cities_page = query_filter_by_page([c for c in cities], page)
        return jsonify(
            {"events": events_page, "jobs": jobs_page, "cities": cities_page}
        )
    else:
        return "Invalid model: " + str(model)


def sort_query(model, attribute):
    if model == "events":
        events = Event.query
        attr = eval("Event." + attribute)
        events = events.filter(attr.isnot(None)).order_by(attr)
        return events
    elif model == "jobs":
        jobs = Job.query
        attr = eval("Job." + attribute)
        jobs = jobs.filter(attr.isnot(None)).order_by(attr)
        return jobs
    elif model == "cities":
        cities = City.query
        attr = eval("City." + attribute)
        cities = cities.filter(attr.isnot(None)).order_by(attr)
        return cities
    else:
        return "Invalid model: " + str(model)


@application.route("/api/<model>/sort/<attribute>")
@cross_origin()
def sort_results(model, attribute):
    if model == "events" or model == "cities" or model == "jobs":
        return jsonify([m.toDict() for m in sort_query(model, attribute)])
    else:
        return "Invalid model: " + str(model)


@application.route("/api/<model>/sort/<attribute>/<page>")
@cross_origin()
def sort_results_page(model, attribute, page):
    if model == "events" or model == "cities" or model == "jobs":
        return jsonify(
            query_filter_by_page([m for m in sort_query(model, attribute)], page)
        )
    else:
        return "Invalid model: " + str(model)


def desc_sort_query(model, attribute):
    if model == "events":
        events = Event.query
        attr = eval("Event." + attribute)
        events = events.filter(attr.isnot(None)).order_by(attr.desc())
        return [e for e in events]
    elif model == "jobs":
        jobs = Job.query
        attr = eval("Job." + attribute)
        jobs = jobs.filter(attr.isnot(None)).order_by(attr.desc())
        return [j for j in jobs]
    elif model == "cities":
        cities = City.query
        attr = eval("City." + attribute)
        cities = cities.filter(attr.isnot(None)).order_by(attr.desc())
        return [c for c in cities]
    else:
        return "Invalid model: " + str(model)


@application.route("/api/<model>/desc_sort/<attribute>")
@cross_origin()
def desc_sort_results(model, attribute):
    if model == "events" or model == "cities" or model == "jobs":
        return jsonify([j.toDict() for j in desc_sort_query(model, attribute)])
    else:
        return "Invalid model: " + str(model)


@application.route("/api/<model>/desc_sort/<attribute>/<page>")
@cross_origin()
def desc_sort_results_page(model, attribute, page):
    if model == "events" or model == "cities" or model == "jobs":
        return jsonify(
            query_filter_by_page([m for m in desc_sort_query(model, attribute)], page)
        )
    else:
        return "Invalid model: " + str(model)


# ---------- #
# API ROUTES #
# ---------- #
@application.route("/api/")
@cross_origin()
def render_home_page():
    return render_template("home.html")


@application.route("/api/events")
@cross_origin()
def get_events():
    return jsonify(query_events())


@application.route("/api/events/page/<num>")
@cross_origin()
def get_events_by_page(num):
    return jsonify(query_events_by_page(num))


def get_jobs():
    return jsonify(query_jobs())


@application.route("/api/jobs")
def get_jobs():
    return jsonify(query_jobs())


@application.route("/api/jobs/id/<id>")
@cross_origin()
def get_one_job_by_id(id):
    return jsonify(query_jobs_by_id(id))


@application.route("/api/jobs/page/<num>")
@cross_origin()
def get_jobs_by_page(num):
    return jsonify(query_jobs_by_page(num))


@application.route("/api/cities")
@cross_origin()
def get_cities():
    return jsonify(query_cities())


@application.route("/api/cities/state/<state>")
@cross_origin()
def get_cities_by_state(state):
    return jsonify(query_cities_by_state(state))


@application.route("/api/cities/page/<num>")
@cross_origin()
def get_cities_by_page(num):
    return jsonify(query_cities_by_page(num))


@application.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


if __name__ == "__main__":
    application.run()
