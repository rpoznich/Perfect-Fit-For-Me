import requests
import json

    # OAuth token: WG5JAPAZ3A56WMVJKO7K
    # User ID: 271324227120
    # App key: TTNHB547XJXQLCEBSL

# used to convert unicode strings
def _byteify(data, ignore_dicts = False):
    # if this is a unicode string, return its string representation
    if isinstance(data, unicode):
        return data.encode('utf-8')
    # if this is a list of values, return list of byteified values
    if isinstance(data, list):
        return [ _byteify(item, ignore_dicts=True) for item in data ]
    # if this is a dictionary, return dictionary of byteified keys and values
    # but only if we haven't already byteified it
    if isinstance(data, dict) and not ignore_dicts:
        return {
            _byteify(key, ignore_dicts=True): _byteify(value, ignore_dicts=True)
            for key, value in data.iteritems()
        }
    # if it's anything else, return it in its original form
    return data

def scrape_events():
	eventsTable = []
	url = "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.within=1500mi&location.latitude=39&location.longitude=-98&token=WG5JAPAZ3A56WMVJKO7K&expand=venue"

	for p in range(1, 11): # scrape 10 pages
		url_with_page = url + "&page=" + str(p)
		eventsJSON = requests.get(url_with_page).text
		# page_info = json.loads(eventsJSON, object_hook=_byteify)["pagination"]
		# page_size = page_info["page_size"]
		events = json.loads(eventsJSON, object_hook=_byteify)["events"]
		for i in range(0, len(events)):
			# print(i)
			eventInstance = {}
			eventInstance["name"] = events[i]["name"]["text"]
			eventInstance["summary"] = events[i]["summary"]
			eventInstance["address"] = events[i]["venue"]["address"]["address_1"]
			eventInstance["city"] = events[i]["venue"]["address"]["city"]
			eventInstance["state"] = events[i]["venue"]["address"]["region"]
			eventInstance["venue"] = events[i]["venue"]["name"]
			eventInstance["start"] = events[i]["start"]["local"]
			eventInstance["end"] = events[i]["end"]["local"]
			eventInstance["timezone"] = events[i]["start"]["timezone"]
			eventInstance["url"] = events[i]["url"]
			if events[i]["logo"] is not None:
				eventInstance["logo"] = events[i]["logo"]["url"]
			else:
				eventInstance["logo"] = None
			eventsTable.append(eventInstance)
		print("Page " + str(p) + " complete")

	# printing table
	# for e in eventsTable:
	# 	print(e["name"])
	# 	for k, v in e.items():
	# 		if k != "name":
	# 			print('   ' + str(k) + ': ' + str(v))
	# print(len(eventsTable))

	return eventsTable;

if __name__ == "__main__":
	scrape_events()