## Files

### `application.py`

Execute this file to deploy the API to localhost

### `models.py`

Stores the model information for SQLAlchemy and the database tables

### `populate.py`

Execute this file to read from the .json files and populate the MySQL database

### `scrape.py`

Execute this file to make API requests and scrape model data to the .json files

### `tests.py`

Unit tests for the Python code

## Commands

Entering Virtual Environment: source env/bin/activate<br>
Exiting Virtual Environment: deactivate<br>
Deploying to Localhost: python application.py<br>
Zipping for Deployment (needs requirements.txt): zip -r perfect-fit.zip templates application.py models.py requirements.txt <br>