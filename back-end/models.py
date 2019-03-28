from config import Config
from flask_sqlalchemy import SQLAlchemy
import json
import requests
from back_end import db

# city_table = db.Table('city',
# 	db.Column('city_name', db.String(30), db.ForeignKey('city.name'))
# 	db.Column('state',db.String(30), db.ForeignKey('city.state'))
# 	)

# salaries_table = db.Table('salary', 
# 	db.Column('city_name', db.String(30), db.ForeignKey('city.name'))
# 	db.Column('state', db.String(30), db.ForeignKey('state.name'))
# 	)

class City(db.Model): 
	__tablename__ = 'city'
    id = db.Column(db.Integer(), primary_key=True) 
    name = db.Column(db.String(30))
    state = db.Column(db.String(30))
    population = db.Column(db.Integer(9))
    web_img = db.Column(db.String(100))
    mobile_img = db.Column(db.String(100))
    latitude = db.Column(db.Float(10))
    longitude = db.Column(db.Float(10))
    jobs = relationship('Job', back_populates="city") 
    

class Job(db.Model): 
	__tablename__ = 'job'
	job_title = db.Column(db.String(35))
	salary = db.Column(db.Float(10)) 
	description = db.Column(db.String(4000)) 
	city_name = db.Column(db.String(30), back_populates="jobs")
	state_name = db.Column(db.String(30), back_populates="jobs")

def create_tables(): 
	db.create_all() 
	print("Tables created")

def


