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

def extract_events():
	# lat/long are center of USA with distance to reach both coasts
	url = "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.within=1500mi&location.latitude=39&location.longitude=-98&token=WG5JAPAZ3A56WMVJKO7K&expand=venue"
	eventsJSON = requests.get(url).text
	events = json.loads(eventsJSON, object_hook=_byteify)["events"]
	return events

if __name__ == "__main__":
	eventsTable = []
	events = extract_events() # list of dicts where each dict is an event
	print(len(events))
	for i in range(0, 50):
		eventInstance = {}
		eventInstance["name"] = events[i]["name"]["text"]
		eventInstance["summary"] = events[i]["summary"]
		eventInstance["location"] = events[i]["venue"]["address"]["localized_address_display"]
		eventInstance["start"] = events[i]["start"]["local"]
		eventInstance["end"] = events[i]["end"]["local"]
		eventInstance["timezone"] = events[i]["start"]["timezone"]
		eventsTable.append(eventInstance)

	# printing table
	for e in eventsTable:
		print(e["name"])
		for k, v in e.items():
			print('   ' + k + ': ' + v)