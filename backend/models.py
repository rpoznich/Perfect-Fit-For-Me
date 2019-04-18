from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import json
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://perfectfit:theozonelair@mysql-db-instance.chdg6as3bxgl.us-east-2.rds.amazonaws.com:3306/perfectfitdb'
db = SQLAlchemy(app)

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
    housing = db.Column(db.Float(4)) 
    cost_of_living = db.Column(db.Float(4)) 
    tolerance = db.Column(db.Float(4)) 
    commute = db.Column(db.Float(4)) 

    def __init__(self, id, n, s, pop, web, mob, lat, lon,
        housing, col, tol, commute): 
        self.id = id
        self.name = n 
        self.state = s
        self.population = pop 
        self.web_img = web 
        self.mobile_img = mob 
        self.latitude = lat 
        self.longitude = lon
        self.housing = housing 
        self.cost_of_living = col 
        self.tolerance = tol 
        self.commute = commute  

    def toDict(self): 
        name = self.name
        city = { 
            "id":self.id,
            "name":self.name,
            "population":self.population,
            "images": {
                "web":self.web_img,
                "mobile":self.mobile_img
            },
            "location": {
                "latitude":self.latitude,
                "longitude":self.longitude,
                "state":self.state 
            }, 
            "qualities": {
                "housing":self.housing,
                "cost of living":self.cost_of_living,
                "tolerance":self.tolerance, 
                "commute":self.commute
            }
        }
        return city

class Job(db.Model):
    job_id = db.Column(db.Integer(), primary_key=True)
    job_title = db.Column(db.String(35))
    description = db.Column(db.String(4000))
    education = db.Column(db.String(50))
    salary = db.Column(db.Float(10))
    city1 = db.Column(db.String(30))
    city2 = db.Column(db.String(30))
    city3 = db.Column(db.String(30))
    city4 = db.Column(db.String(30))
    city5 = db.Column(db.String(30))
    salary1 = db.Column(db.Float(10))
    salary2 = db.Column(db.Float(10))
    salary3 = db.Column(db.Float(10))
    salary4 = db.Column(db.Float(10))
    salary5 = db.Column(db.Float(10))

    def toDict(self): 
        job = {
            "id":self.job_id, 
            "job title":self.job_title,
            "description": self.description,
            "education": self.education,
            "annual salary":self.salary, 
            "top cities": [
                self.city1,
                self.city2,
                self.city3,
                self.city4,
                self.city5
            ],
            "top cities salaries": {
                self.city1 : self.salary1,
                self.city2 : self.salary2,
                self.city3 : self.salary3,
                self.city4 : self.salary4,
                self.city5 : self.salary5
            }
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
    duration = db.Column(db.Float(5))
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
                "duration": self.duration,
                "timezone": self.timezone,
                "url": self.url,
                "logo": self.logo}