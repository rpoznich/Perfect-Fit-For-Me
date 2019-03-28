from models import City, Job, Event, db
import json

def clear_tables(): 
    db.session.query(City).delete()
    db.session.query(Job).delete()
    db.session.query(Event).delete()
    db.session.commit()
    print("   Cleared tables")

def populate_cities(): 
    with open('static/json/cities.json') as inp: 
        cities = json.load(inp)
    for city in cities: 
        c = cities[city]
        city_db_obj = City(
            c['city id'], city, c['location']['state'], c["location"]["population"],
            c["images"]["web"], c["images"]["mobile"], c["location"]["latitude"],
            c["location"]["longitude"] 
            )
        db.session.add(city_db_obj)
    db.session.commit()
    print("   Populated cities")

def populate_jobs(): 
    with open('static/json/cities.json') as inp: 
        cities = json.load(inp)
    job_id = 1
    for city in cities: 
        salaries = cities[city]['salaries']
        for salary in salaries: 
            job_db_obj = Job(job_id, salary, city, cities[city]['location']['state'],salaries[salary])
            db.session.add(job_db_obj)
            job_id += 1
    db.session.commit()
    print("   Populated jobs")


def populate_events():
    with open('static/json/events.json') as inp:
        events = json.load(inp)
    for e in events:
        event = Event(eventid  = e["eventid"],
                      name     = e["name"],
                      summary  = e["summary"],
                      address  = e["address"],
                      city     = e["city"],
                      state    = e["state"],
                      venue    = e["venue"],
                      start    = e["start"],
                      end      = e["end"],
                      timezone = e["timezone"],
                      url      = e["url"],
                      logo     = e["logo"])
        db.session.add(event)
    db.session.commit()
    print("   Populated events")

if __name__ == "__main__": 
    print("Starting population process")
    clear_tables()
    populate_cities()
    populate_jobs()
    populate_events()
    print("Completed population process")