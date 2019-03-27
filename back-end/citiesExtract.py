import requests 
import json

def extract_cities():
	url = "https://api.teleport.org/api/continents/geonames:NA/urban_areas"
	JSON_obj = requests.get(url).text
	cities = json.loads(JSON_obj)["_links"]["ua:items"]
	print(cities)
	return JSON_obj
