
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
    return jsonify(citiesExtract.scrape_cities()) #"In development. PLEASE COME BACK LATER"

if __name__ == '__main__': 
	app.run(debug=True)