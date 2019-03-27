from flask import Flask
from flask import jsonify
import json
import requests
import citiesExtract
app = Flask(__name__)

@app.route('/') 
def get_default(): 
	return 'Welcome to the back-end' 

@app.route('/api/cities')
def get_cities():
    cities = citiesExtract.extract_cities()
    #images = citiesExtract.extract_images(cities)
    values = citiesExtract.extract_values(cities)
    return jsonify(values) #"In development. PLEASE COME BACK LATER"


if __name__ == '__main__': 
	print("Is this running")
	app.run(debug=True, host='0.0.0.0')