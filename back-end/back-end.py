from flask import Flask
import json
import requests
import citiesExtract
app = Flask(__name__)

@app.route('/') 
def get_default(): 
	return 'Welcome to the back-end' 

@app.route('/api/cities')
def get_cities():
    return citiesExtract.extract_cities()

if __name__ == '__main__': 
	print("Is this running")
	app.run(debug=True, host='0.0.0.0')