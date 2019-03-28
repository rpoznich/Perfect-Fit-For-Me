from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import json
import requests

application = Flask(__name__)
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://perfectfit:theozonelair@mysql-db-instance.chdg6as3bxgl.us-east-2.rds.amazonaws.com:3306/perfectfitdb'
db = SQLAlchemy(application)

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

    def toDict(self): 
        name = self.name
        city = { 
            "id":self.id, 
            "population":self.population,
            "images": {
                "web":self.web_img,
                "mobile":self.mobile_img
            },
            "location": {
                "latitude":self.latitude,
                "longitude":self.longitude,
                "state":self.state 
            }
        }
        return city

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

    def toDict(self): 
        job = {
            "id":self.job_id, 
            "job title":self.job_title,
            "annual salary":self.salary, 
            "location": {
                "city": self.city_name,
                "state": self.state
            },
            "description": self.description
        }
        return job

class Event(db.Model):
    eventid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    summary = db.Column(db.String(1000))
    address = db.Column(db.String(200))
    city = db.Column(db.String(25))
    state = db.Column(db.String(25))
    venue = db.Column(db.String(200))
    start = db.Column(db.String(25))
    end = db.Column(db.String(25))
    timezone = db.Column(db.String(50))
    url = db.Column(db.String(300))
    logo = db.Column(db.String(300), nullable=True)

    def json(self):
        return {"eventid": self.eventid, 
                "name": self.name,
                "summary": self.summary,
                "address": self.address,
                "city": self.city,
                "state": self.state,
                "venue": self.venue,
                "start": self.start,
                "end": self.end,
                "timezone": self.timezone,
                "url": self.url,
                "logo": self.logo}