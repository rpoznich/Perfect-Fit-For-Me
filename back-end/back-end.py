from flask import Flask
import json
import requests
app = Flask(__name__)

def extract_cities():
	url = "https://api.teleport.org/api/continents/geonames:NA/urban_areas"
	JSON_obj = requests.get(url).text
	cities = json.loads(JSON_obj)
	print(cities.keys())
	return JSON_obj

@app.route('/') 
def get_default(): 
	return 'Welcome to the back-end' 

@app.route('/api/cities')
def get_cities():
    return extract_cities()

if __name__ == '__main__': 
	print("Is this running")
	app.run(debug=True, host='0.0.0.0')