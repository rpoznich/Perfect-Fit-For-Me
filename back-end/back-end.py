
from flask import Flask
from flask import jsonify
from config import Config
from flask_sqlalchemy import SQLAlchemy
import json
import requests
import citiesExtract


app = Flask(__name__)
app.config.from_object(Config) 
db = SQLAlchemy(app) 


@app.route('/') 
def get_default(): 
	return 'Welcome to the back-end' 

@app.route('/api/cities')
def get_cities():
    cities = citiesExtract.extract_cities()
    images = citiesExtract.extract_images(cities)
    values = citiesExtract.extract_values(cities)
    location = citiesExtract.extract_location(cities)
    salaries = citiesExtract.extract_salaries(cities)
    cities = {}
    city_id = 1
    for k in images: 
        if k in values and k in location and k in salaries: 
            cities[k] = {"city id":city_id, "images":images[k], "qualities":values[k], 
                        "location":location[k], "salaries":salaries[k]}
        city_id += 1

    return jsonify(cities) #"In development. PLEASE COME BACK LATER"


if __name__ == '__main__': 
	app.run()