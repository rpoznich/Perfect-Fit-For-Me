from bs4 import BeautifulSoup
import requests 
import json

def extract_cities():
	url = "https://api.teleport.org/api/continents/geonames:NA/urban_areas"
	JSON_obj = requests.get(url).text
	cities = json.loads(JSON_obj)["_links"]["ua:items"]
	# print(cities)
	print(JSON_obj)
	return JSON_obj

def scrape_jobs():
	# url = "http://dataquestio.github.io/web-scraping-pages/simple.html"
	url = "https://www.indeed.com/l-Austin,-TX-jobs.html"
	page = requests.get(url)
	soup = BeautifulSoup(page.content, 'html.parser')
	print(soup.prettify())

def web_scrape_test():
	url = "http://www.imdb.com/search/title?release_date=2017&sort=num_votes,desc&page=1"
	page = requests.get(url)
	soup = BeautifulSoup(page.text, 'html.parser')
	movie_containers = soup.find_all('div', class_ = 'lister-item mode-advanced')
	print(movie_containers[0])

if __name__ == '__main__':
	# extract_cities()
	# scrape_jobs()
	web_scrape_test()