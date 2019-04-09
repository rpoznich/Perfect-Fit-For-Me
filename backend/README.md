## Files

### `application.py`

Execute this file to deploy the API to localhost

### `models.py`

Stores the model information for SQLAlchemy and the MySQL database

### `populate.py`

Execute this file to read from the .json files 

### `scrape.py`

Execute this file to make API requests and scrape data to the .json files

## Commands

Entering Virtual Environment: source env/bin/activate<br>
Exiting Virtual Environment: deactivate<br>
Zipping for Deployment (requires git ignored files): zip -r test.zip templates application.py models.py requirements.txt <br>