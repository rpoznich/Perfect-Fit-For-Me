import requests 
import json

def extract_cities():
	url = "https://api.teleport.org/api/continents/geonames:NA/urban_areas"
	print("okay, city")
	JSON_obj = requests.get(url).text
	cities = json.loads(JSON_obj)["_links"]["ua:items"]
	return cities # list of cities

def extract_images(cities): 
	images = {} # "city_name":"image_link"
	print("okay, img")
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
	print("okay, location")
	values = {}
	for city in cities: 
		name = city["name"]
		linkToCity = city["href"]
		cityJSON = requests.get(linkToCity).text
		link = json.loads(cityJSON)["_links"]
		cityInfo = link["ua:scores"]
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

def extract_location(cities): 
	location = {}
	for city in cities: 
		name = city["name"]
		linkToCity = city["href"]
		cityJSON = requests.get(linkToCity).text
		jsonToDict = json.loads(cityJSON)
		linkToCityInfo = jsonToDict["_links"]["ua:identifying-city"]["href"]
		cityInfoJSON = requests.get(linkToCityInfo).text
		cityInfo = json.loads(cityInfoJSON)
		state = cityInfo["_links"]["city:admin1_division"]["name"]
		population = cityInfo["population"]
		latlon = cityInfo["location"]["latlon"]
		latitude = latlon["latitude"]
		longitude = latlon["longitude"]
		location[name] = {"state":state, "latitude":latitude, "longitude":longitude
						  ,"population":population}
	return location

def extract_salaries(cities): 
	salaries = {}
	for city in cities: 
		name = city["name"]
		linkToCity = city["href"]
		cityJSON = requests.get(linkToCity).text
		jsonToDict = json.loads(cityJSON)
		linkToSalaryInfo = jsonToDict["_links"]["ua:salaries"]["href"]
		salaryInfoJSON = requests.get(linkToSalaryInfo).text 
		salaryInfo = json.loads(salaryInfoJSON)["salaries"]
		jobsSalaries = {}
		for salary in salaryInfo: 
			jobName = salary["job"]["title"]
			avg_salary = salary["salary_percentiles"]["percentile_50"]
			jobsSalaries[jobName] = avg_salary
		salaries[name] = jobsSalaries
	return salaries






