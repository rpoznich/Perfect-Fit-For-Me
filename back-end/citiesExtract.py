import requests 
import json

def extract_cities():
	url = "https://api.teleport.org/api/continents/geonames:NA/urban_areas"
	JSON_obj = requests.get(url).text
	cities = json.loads(JSON_obj)["_links"]["ua:items"]
	return cities # list of cities

def extract_images(cities): 
	images = {} # "city_name":"image_link"
	for city in cities: 
		name = city["name"]
		linkToCity = city["href"]
		cityJSON = requests.get(linkToCity).text
		cityInfo = json.loads(cityJSON)["_links"]["ua:images"]
		imageLink = cityInfo["href"]
		imageJSON = requests.get(imageLink).text
		imageInfo = json.loads(imageJSON)["photos"][0]["image"]
		images[name] = imageInfo

	return images




def extract_values(cities): 
	values = {}
	for city in cities: 
		name = city["name"]
		linkToCity = city["href"]
		cityJSON = requests.get(linkToCity).text
		cityInfo = json.loads(cityJSON)["_links"]["ua:scores"]
		valuesLink = cityInfo["href"]
		valuesJSON = requests.get(valuesLink).text 
		valuesInfo = json.loads(valuesJSON)["categories"]
		categories = {}
		validCategories = ["Housing", "Cost of Living", "Commute", "Tolerance"]
		for category in valuesInfo: 
			categoryTitle = category["name"]
			if categoryTitle in validCategories:
				categories[categoryTitle] = category["score_out_of_10"]
		values[name] = categories
	return values




