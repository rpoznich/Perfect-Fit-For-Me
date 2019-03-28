from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import eventsExtract

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://perfectfit:theozonelair@mysql-db-instance.chdg6as3bxgl.us-east-2.rds.amazonaws.com:3306/perfectfitdb'
db = SQLAlchemy(app)

# class Job(db.Model):
#     attributes

# class City(db.Model):
#     attributes

class Event(db.Model):
	eventid = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(200))
	summary = db.Column(db.String(1000))
	address = db.Column(db.String(200))
	venue = db.Column(db.String(200))
	start = db.Column(db.String(25))
	end = db.Column(db.String(25))
	timezone = db.Column(db.String(30))
	url = db.Column(db.String(300))
	logo = db.Column(db.String(300), nullable=True)

	def json(self):
		return {"eventid": self.eventid, 
				"name": self.name,
				"summary": self.summary,
				"address": self.address,
				"venue": self.venue,
				"start": self.start,
				"end": self.end,
				"timezone": self.timezone,
				"url": self.url,
				"logo": self.logo}

if __name__ == "__main__":
	# CLEARS ALL ROWS FOR SPECIFIED TABLE, UNCOMMENT WITH DISCRETION
	# db.session.query(Event).delete()
	# db.session.commit()

	# DROPS THE SPECIFIED TABLE, UNCOMMENT WITH DISCRETION
	# Event.__table__.drop(db.engine)

	# CREATES TABLES FOR MODELS IF THEY DON'T EXIST
	db.create_all()

	# CODE FOR ADDING EVENTS
	# eid = 1
	# for e in eventsExtract.scrape_events():
	# 	event = Event(eventid  = eid,
	# 				  name     = e["name"],
	# 				  summary  = e["summary"],
	# 				  address  = e["address"],
	# 				  venue    = e["venue"],
	# 				  start    = e["start"],
	# 				  end      = e["end"],
	# 				  timezone = e["timezone"],
	# 				  url      = e["url"],
	# 				  logo     = e["logo"])
	# 	eid += 1
	# 	# duplicate = Event.query.filter_by(eventid=e["eventid"]).first()
	# 	# if duplicate is None:
	# 	db.session.add(event)
	# 	db.session.commit()

	# CODE FOR TESTING BY ADDING ONE EVENT
	# test = Event(eventid  = 0,
	# 			 name     = "Test Name",
	# 			 summary  = "Test Summary",
	# 			 address  = "Test Address",
	# 			 venue    = "Test Venue",
	# 			 start    = "Test Start",
	# 			 end      = "Test End",
	# 			 timezone = "Test Timezone",
	# 			 url      = "Test URL",
	# 			 logo     = "Test Logo")
	# db.session.add(test)
	# db.session.commit()
