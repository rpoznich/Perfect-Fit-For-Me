from models import City, Job, Event, db
import json


def clear_tables():
    db.drop_all()
    print("   Deleted tables")


def create_tables():
    db.create_all()
    print("   Created Tables")


def populate_cities():
    with open("static/json/cities.json") as inp:
        cities = json.load(inp)
    for city in cities:
        c = cities[city]
        city_db_obj = City(
            c["city id"],
            city,
            c["location"]["state"],
            c["location"]["population"],
            c["images"]["web"],
            c["images"]["mobile"],
            c["location"]["latitude"],
            c["location"]["longitude"],
            c["qualities"]["Housing"],
            c["qualities"]["Cost of Living"],
            c["qualities"]["Tolerance"],
            c["qualities"]["Commute"],
        )
        db.session.add(city_db_obj)
    db.session.commit()
    print("   Populated cities")


def populate_jobs():
    with open("static/json/jobs.json") as inp:
        jobs = json.load(inp)
    for job_name in jobs:
        j = jobs[job_name]
        job = Job(
            job_id=j["id"],
            job_title=j["title"],
            description=j["description"],
            education=j["education"],
            salary=j["national-salary"],
            city1=j["top-cities"][0],
            city2=j["top-cities"][1],
            city3=j["top-cities"][2],
            city4=j["top-cities"][3],
            city5=j["top-cities"][4],
            salary1=j["top-cities-salaries"][j["top-cities"][0]],
            salary2=j["top-cities-salaries"][j["top-cities"][1]],
            salary3=j["top-cities-salaries"][j["top-cities"][2]],
            salary4=j["top-cities-salaries"][j["top-cities"][3]],
            salary5=j["top-cities-salaries"][j["top-cities"][4]],
        )
        db.session.add(job)
    db.session.commit()
    print("   Populated jobs")


def populate_events():
    with open("static/json/events.json") as inp:
        events = json.load(inp)
    for e in events:
        event = Event(
            eventid=e["eventid"],
            name=e["name"],
            summary=e["summary"],
            address=e["address"],
            city=e["city"],
            state=e["state"],
            venue=e["venue"],
            start=e["start"],
            end=e["end"],
            duration=e["duration"],
            timezone=e["timezone"],
            url=e["url"],
            logo=e["logo"],
        )
        db.session.add(event)
    db.session.commit()
    print("   Populated events")


if __name__ == "__main__":
    print("Starting population process")
    clear_tables()
    create_tables()
    populate_cities()
    populate_jobs()
    populate_events()
    print("Completed population process")
