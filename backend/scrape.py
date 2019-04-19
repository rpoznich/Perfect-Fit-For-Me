import json
import requests


def extract_cities():
    url = "https://api.teleport.org/api/continents/geonames:NA/urban_areas"
    JSON_obj = requests.get(url).text
    cities = json.loads(JSON_obj)["_links"]["ua:items"]
    print("   Extracted cities")
    return cities  # list of cities


def extract_images(cities):
    images = {}  # "city_name":"image_link"
    for city in cities:
        name = city["name"]
        linkToCity = city["href"]
        cityJSON = requests.get(linkToCity).text
        cityInfo = json.loads(cityJSON)["_links"]["ua:images"]
        imageLink = cityInfo["href"]
        imageJSON = requests.get(imageLink).text
        imageInfo = json.loads(imageJSON)["photos"][0]["image"]
        images[name] = imageInfo
    print("   Extracted images")
    return images


def extract_values(cities):
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
    print("   Extracted values")
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
        location[name] = {
            "state": state,
            "latitude": latitude,
            "longitude": longitude,
            "population": population,
        }
    print("   Extracted locations")
    return location


def scrape_cities():
    cities = extract_cities()
    images = extract_images(cities)
    values = extract_values(cities)
    location = extract_location(cities)
    cities = {}
    city_id = 1

    for k in images:
        if k in values and k in location:
            cities[k] = {
                "city id": city_id,
                "images": images[k],
                "qualities": values[k],
                "location": location[k],
            }
        city_id += 1

    with open("static/json/cities.json", "w") as out:
        out.write(json.dumps(cities, indent=4, separators=(",", ": ")))

    print("   Scraped cities and jobs")
    return cities


# used to convert unicode strings
def _byteify(data, ignore_dicts=False):
    # if this is a unicode string, return its string representation
    if isinstance(data, unicode):
        return data.encode("utf-8")
        # if this is a list of values, return list of byteified values
    if isinstance(data, list):
        return [_byteify(item, ignore_dicts=True) for item in data]
        # if this is a dictionary, return dictionary of byteified keys and values
        # but only if we haven't already byteified it
    if isinstance(data, dict) and not ignore_dicts:
        return {
            _byteify(key, ignore_dicts=True): _byteify(value, ignore_dicts=True)
            for key, value in data.iteritems()
        }
        # if it's anything else, return it in its original form
    return data


# User ID: d7iQVH52IkmHUPZ
# Token Key: dVaq+TBMNG2YuPbMqeUj+JcTmVkwW+dEbQaPPDdw093d09zu31kA9g01AA4Fx5f7rQb1vrrR0L9420I3e8LmPg==
def scrape_jobs():
    url = "https://api.careeronestop.org/v1/lmi/d7iQVH52IkmHUPZ/"
    token = "Bearer dVaq+TBMNG2YuPbMqeUj+JcTmVkwW+dEbQaPPDdw093d09zu31kA9g01AA4Fx5f7rQb1vrrR0L9420I3e8LmPg=="

    jobs = {}
    job_names = []
    job_codes = []
    city_names = []
    city_codes = []
    with open("static/txt/jobs.txt") as f:
        job_names = f.read().splitlines()
    with open("static/txt/jobcodes.txt") as f:
        job_codes = f.read().splitlines()
    with open("static/txt/cities.txt") as f:
        city_names = f.read().splitlines()
    with open("static/txt/zipcodes.txt") as f:
        city_codes = f.read().splitlines()

    for j in range(0, len(job_names)):
        instance_url = url + str(job_codes[j]) + "/"
        salaries = {}
        for c in range(0, len(city_names)):
            connected = False
            attempts = 0
            while not connected:
                try:
                    zipJSON = requests.get(
                        instance_url + city_codes[c], headers={"Authorization": token}
                    ).text
                    connected = True
                except requests.ConnectionError:
                    print("   Failed connection, retrying")
                    attempts += 1
                    if attempts == 10:
                        print("   Failed connection 10 times, aborting")
                        break
                    pass
            zipInfo = json.loads(zipJSON, object_hook=_byteify)
            zipSalary = zipInfo["LMI"]["AveragePayZip"]
            if zipSalary:
                salaries[city_names[c]] = int(zipSalary.replace(",", ""))
            else:
                salaries[city_names[c]] = 0
            print(
                "   Extracted salary ("
                + str(c + 1)
                + " out of "
                + str(len(city_names))
                + ")"
            )
        top_cities = sorted(salaries, key=salaries.get, reverse=True)[:5]
        top_salaries = {}
        for city in top_cities:
            top_salaries[city] = salaries[city]
        jobJSON = requests.get(
            instance_url + "US", headers={"Authorization": token}
        ).text
        jobInfo = json.loads(jobJSON, object_hook=_byteify)
        jobInstance = {}
        jobInstance["id"] = j + 1
        jobInstance["title"] = job_names[j]
        jobInstance["description"] = jobInfo["SocInfo"]["SocDescription"]
        jobInstance["education"] = jobInfo["LMI"]["TypicalTraining"]
        jobInstance["national-salary"] = int(
            jobInfo["LMI"]["AveragePayNational"].replace(",", "")
        )
        jobInstance["top-cities"] = top_cities
        jobInstance["top-cities-salaries"] = top_salaries
        jobs[job_names[j]] = jobInstance
        print(
            "   Extracted job (" + str(j + 1) + " out of " + str(len(job_names)) + ")"
        )

    with open("static/json/jobs.json", "w") as out:
        out.write(json.dumps(jobs, indent=4, separators=(",", ": ")))

    print("   Scraped jobs")
    return jobs


# OAuth token: WG5JAPAZ3A56WMVJKO7K
# User ID: 271324227120
# App key: TTNHB547XJXQLCEBSL
def date_string_to_float(time):
    day = int(time.split("T")[0].split("-")[2])
    time = time.split("T")[1].split(":")
    hour = float(time[0]) + 24 * day
    minute = float(time[1]) / 60
    return hour + minute


def scrape_events():
    eventsTable = []
    url = "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.within=1500mi&location.latitude=39&location.longitude=-98&token=WG5JAPAZ3A56WMVJKO7K&expand=venue"
    eventid = 1
    num_pages = 10
    for p in range(1, num_pages + 1):  # scrape 10 pages
        url_with_page = url + "&page=" + str(p)
        eventsJSON = requests.get(url_with_page).text
        events = json.loads(eventsJSON, object_hook=_byteify)["events"]
        for i in range(0, len(events)):
            # print(i)
            eventInstance = {}
            eventInstance["eventid"] = eventid
            eventInstance["name"] = events[i]["name"]["text"]
            eventInstance["summary"] = events[i]["summary"]
            eventInstance["address"] = events[i]["venue"]["address"]["address_1"]
            eventInstance["city"] = events[i]["venue"]["address"]["city"]
            eventInstance["state"] = events[i]["venue"]["address"]["region"]
            eventInstance["venue"] = events[i]["venue"]["name"]
            start = eventInstance["start"] = events[i]["start"]["local"]
            end = eventInstance["end"] = events[i]["end"]["local"]
            duration = date_string_to_float(end) - date_string_to_float(start)
            eventInstance["duration"] = duration
            eventInstance["timezone"] = events[i]["start"]["timezone"]
            eventInstance["url"] = events[i]["url"]
            if events[i]["logo"] is not None:
                eventInstance["logo"] = events[i]["logo"]["url"]
            else:
                eventInstance["logo"] = None
            eventsTable.append(eventInstance)
            eventid += 1
        print("   Extracted events (page " + str(p) + " out of " + str(num_pages) + ")")

    with open("static/json/events.json", "w") as out:
        out.write(json.dumps(eventsTable, indent=4, separators=(",", ": ")))

    print("   Scraped events")
    return eventsTable


if __name__ == "__main__":
    print("Starting scraping process")
    # scrape_cities() # IF RAN AGAIN, REMOVE NON-US CITIES FROM JSON
    # scrape_jobs()
    scrape_events()
    print("Completed scraping process")
