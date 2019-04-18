
from unittest import main, TestCase
import sys, os 
sys.path.append(os.path.abspath(os.path.join('..','..', 'back-end')))

from models import City, Job, Event, db
from scrape import date_string_to_float


class TestModels (TestCase): 

    # def setUp(self): 
    #     self.app = app.test_client() 
    #     self.app.testing = True

    ####################
    # Scraping Methods #
    ####################

    def test_date_to_float(self): 
        date = "2019-03-3T18:30:00"
        time = date_string_to_float(date)
        self.assertEqual(time,90.5)

    ##########################
    # Model's toDict Methods #
    ##########################

    def test_city_to_dict(self):

        city = City(1,"name","tx","100000", "link", 
            "mobile_link", 0.0, 0.0, 5.5, 5.5, 5.5, 5.5)
        city_stats_test = { 
            "id":1, 
            "name":"name",
            "population":"100000",
            "images": {
                "web":"link",
                "mobile":"mobile_link"
            },
            "location": {
                "latitude":0.0,
                "longitude":0.0,
                "state":"tx" 
            }, 
            "qualities": {
                "housing":5.5,
                "cost of living":5.5,
                "tolerance":5.5, 
                "commute":5.5
            }
        }
     
        self.assertEqual(city_stats_test, city.toDict())

    def test_job_to_dict(self): 
        job = Job(job_id=1,job_title="name", education="Bachelor", 
            description="a job", salary=1.0, city1="city1", city2="city2",
            city3="city3", city4="city4", city5="city5", salary1=1.0, 
            salary2=1.0, salary3=1.0, salary4=1.0, salary5=1.0) 
        job_stats_test = {
            "id":1, 
            "job title":"name",
            "annual salary":1.0, 
            "education":"Bachelor",
            "top cities": [
                "city1",
                "city2",
                "city3",
                "city4",
                "city5"
            ], 
            "top cities salaries": {
                "city1":1.0,
                "city2":1.0,
                "city3":1.0,
                "city4":1.0,
                "city5":1.0,
            },
            "description":"a job"
        }

        self.assertEqual(job_stats_test, job.toDict())

    def test_event_to_dict(self):
        event = Event(eventid=1,name="name",summary="sum",
            address="addr",city="city",state="tx",venue="venue",
            start="start",end="end",duration=1.0,timezone="timezone",
            url="url",logo="logo")
        event_stats_test = {
            "eventid":1, 
            "name":"name", 
            "summary":"sum", 
            "address":"addr", 
            "city":"city", 
            "state":"tx", 
            "venue":"venue",
            "start":"start",
            "end":"end",
            "duration":1.0,
            "timezone":"timezone",
            "url":"url",
            "logo":"logo"
        }
        self.assertEqual(event_stats_test, event.json())


    #######################
    # Table Query Testing #
    #######################

    def test_single_instance_job(self): 
        job = Job.query.get(10)
        self.assertEqual(type(job), Job)

    def test_jobs_all_same_city(self): 
        jobs = Job.query.filter_by(city1="Austin")
        all_same = True 
        for job in jobs: 
            if job.city1 != "Austin": 
                all_same = False 
                break
        self.assertEqual(all_same, True)

    def test_job_not_in_db(self): 
        job = Job.query.filter_by(job_title="Homeschool Teacher").all()
        self.assertEqual(job, [])

    def test_single_instance_city(self): 
        city = City.query.get(2) 
        self.assertEqual(type(city), City)

    def test_city_not_in_cb(self): 
        city = City.query.filter_by(name="Scooby Doo").all() 
        self.assertEqual(city, []) 

    def test_single_instance_event(self): 
        event = Event.query.get(1) 
        self.assertEqual(type(event), Event)

    def test_event_not_in_cb(self): 
        event = Event.query.filter_by(name="Superhero Slumber Symphony").all() 
        self.assertEqual(event, [])

if __name__ == '__main__': 
    main()