
from unittest import main, TestCase
import sys, os 
sys.path.append(os.path.abspath(os.path.join('..','..', 'back-end')))

from models import City, Job, Event, db


class TestModels (TestCase): 

    # def setUp(self): 
    #     self.app = app.test_client() 
    #     self.app.testing = True


    ##########################
    # Model's toDict Methods #
    ##########################

    def test_city_to_dict(self):

        city = City(1,"name","tx","100000", "link", 
            "mobile_link", 0.0, 0.0, 5.5, 5.5, 5.5, 5.5)
        city_stats_test = { 
            "id":1, 
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
        job = Job(1,"name", "city", "tx", 1.0, "A Job") 
        job_stats_test = {
            "id":1, 
            "job title":"name",
            "annual salary":1.0, 
            "location": {
                "city":"city",
                "state":"tx"
            }, 
            "description":"A Job"
        }

        self.assertEqual(job_stats_test, job.toDict())

    def test_event_to_dict(self):
        event = Event(eventid=1,name="name",summary="sum",
            address="addr",city="city",state="tx",venue="venue",
            start="start",end="end",timezone="timezone",url="url",logo="logo")
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
            "timezone":"timezone",
            "url":"url",
            "logo":"logo"
        }
        self.assertEqual(event_stats_test, event.json())


if __name__ == '__main__': 
    main()