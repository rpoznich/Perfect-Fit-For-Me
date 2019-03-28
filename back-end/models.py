
from flask_sqlalchemy import sqlalchemy
import json
import requests
from app import db

# city_table = db.Table('city',
#   db.Column('city_name', db.String(30), db.ForeignKey('city.name'))
#   db.Column('state',db.String(30), db.ForeignKey('city.state'))
#   )

# salaries_table = db.Table('salary', 
#   db.Column('city_name', db.String(30), db.ForeignKey('city.name'))
#   db.Column('state', db.String(30), db.ForeignKey('state.name'))
#   )
class City(db.Model): 
    __tablename__ = 'city'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(30))
    state = db.Column(db.String(30))
    population = db.Column(db.String(9))
    web_img = db.Column(db.String(100))
    mobile_img = db.Column(db.String(100))
    latitude = db.Column(db.Float(10))
    longitude = db.Column(db.Float(10)) 

    def __init__(self, id, n, s, pop, web, mob, lat, lon): 
        self.id = id
        self.name = n 
        self.state = s
        self.population = pop 
        self.web_img = web 
        self.mobile_img = mob 
        self.latitude = lat 
        self.longitude = lon    

class Job(db.Model): 
    __tablename__ = 'job'
    job_id = db.Column(db.Integer(), primary_key=True)
    job_title = db.Column(db.String(35))
    city_name = db.Column(db.String(30))
    state = db.Column(db.String(30))
    salary = db.Column(db.Float(10)) 
    description = db.Column(db.String(4000)) 

    def __init__ (self, id, name, city_name, state, salary = None, description = None):
        self.job_id = id
        self.job_title = name
        self.city_name = city_name
        self.state = state
        self.salary = salary 
        self.description = description

def remove_tables(): 
    db.drop_all() 
    print("Removed all tables")

def create_tables(): 
    db.create_all() 
    print("Tables created")

def make_jobs_table(): 
    with open('static/json/cities.json') as inp: 
        cities = json.load(inp)
    job_id = 1
    for city in cities: 
        salaries = cities[city]['salaries']
        for salary in salaries: 
            job_db_obj = Job(job_id, salary, city, cities[city]['location']['state'],salaries[salary])
            db.session.add(job_db_obj)
            job_id += 1
    db.session.commit()
    print("Made jobs table")

def make_cities_table(): 
    with open('static/json/cities.json') as inp: 
        cities = json.load(inp)
    for city in cities: 
        c = cities[city]
        city_db_obj = City(
            c['city id'], city, c['location']['state'], c["location"]["population"],
            c["images"]["web"], c["images"]["mobile"], c["location"]["latitude"],
            c["location"]["longitude"] 
            )
        # job_db_obj = Job.query.filter_by(state=city_db_obj.state,city_name=city_db_obj.name).all()
        # city_db_obj.jobs = job_db_obj
        db.session.add(city_db_obj)
    db.session.commit()
    print("Made cities table")

def get_jobs(): 
    jobs = {"Jobs":[]}
    job_objs = Job.query.all() 
    for j in job_objs: 
        job = {
            "id":j.job_id, 
            "job title":j.job_title,
            "annual salary":j.salary, 
            "location": {
                "city": j.city_name,
                "state": j.state
            },
            "description": j.description
        }
        jobs["Jobs"].append(job)
    return jobs

def get_cities(): 
    cities = {}
    city_objs = City.query.all()
    for c in city_objs: 
        name = c.name
        cities[name] = { 
            "id":c.id, 
            "population":c.population,
            "images": {
                "web":c.web_img,
                "mobile":c.mobile_img
            },
            "location": {
                "latitude":c.latitude,
                "longitude":c.longitude,
                "state":c.state 
            }
        }
    return cities
if __name__ == "__main__": 
    print("Making the databases")
    remove_tables()
    create_tables()
    make_jobs_table() 
    make_cities_table()



