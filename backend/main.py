""" 
Main file for the backend: routes / endpoints
CRUD: Create, Read, Update, Delete
"""
# pylint: disable=W0105, C0413

# Collapsed: Review of Endpoints, Requests, and Responses.
'''
# What is an endpoint?
# When we submit a request to the create endpoint,
# we need to pass it some values.
# Endpoint example: https://<domain>.com/<endpoint>
# 'Create' Endpoint: https://localhost:5000/create_contact
# - first_name
# - last_name
# - email

# What is a request?
# Something we send to a server (in this case, to an API).
# Sending a request for something to happen.

# Requests have some types:
# GET - retrieve some existing data
# POST - create some new data
# PUT / PATCH - update some existing data
# DELETE - delete some existing data

# Requests can send different kinds of data:
# json: {
#   id: 69420
#   first_name : William
# }

# Backend will return a Response.
# status: Specify if the request was successful.
#   - status: 200 - successful request
#   - status: 404 - not found
#   - status: 400 - bad request
# json: Return the json data that was requested
'''

# Begin Document
from flask import request, jsonify
from config import app, db
from models import Contact

# GET
@app.route("/contacts", methods=["GET"]) # Decorator
def get_contacts():
    contacts = Contact.query.all() # Get all the contacts that exist in the DB.
    json_contacts = list(map(lambda x: x.to_json(), contacts)) # Convert each contact to JSON
    return jsonify({"contacts": json_contacts})

# Only run the entire file from itself.
if __name__ == "__main__":
    # Instantiate the DB by creating the defined models.
    with app.app_context():
        db.create_all()

    app.run(debug=True)

