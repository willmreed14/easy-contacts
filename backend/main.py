""" 
Main file for the backend: routes / endpoints
CRUD: Create, Read, Update, Delete
"""

# pylint: disable=W0105, C0413

# Collapsed: Review of Endpoints, Requests, and Responses.
"""
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
"""

# Begin Document
from flask import request, jsonify
from config import app, db
from models import Contact


# GET: Get all contacts
@app.route("/contacts", methods=["GET"])  # Decorator
def get_contacts():
    """Retrieve all contacts from the database and return them as JSON."""
    contacts = Contact.query.all()  # Get all the contacts that exist in the DB.
    json_contacts = list(
        map(lambda x: x.to_json(), contacts)
    )  # Convert each contact to JSON
    return jsonify({"contacts": json_contacts})


# POST: Create a contact
@app.route("/create_contact", methods=["POST"])
def create_contact():
    """Create a new contact from the provided JSON data."""

    # Get the user-entered data for each field
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    # Verify that the data was entered correctly
    if not first_name or not last_name or not email:
        return (
            jsonify(
                {"message": "You must include a first name, last name, and email."}
            ),
            400,
        )

    # Now we know the data is good to use for the new contact.
    # Create an instance of the Contact class.
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)

    # Add the new_contact object to the database
    try:
        db.session.add(new_contact)  # 'staging area'
        db.session.commit()  # commit staged items to db
    except Exception as e:
        return jsonify({"message": str(e)}, 400)

    # Return success message
    return jsonify({"message": "Contact added successfully"}), 201


# PUT: Update a contact
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    """Update an existing contact's information by their ID."""

    # Get the contact to be updated
    contact = Contact.query.get(user_id)
    if not contact:  # Handle contact not found
        return jsonify({"message": "User not found"}), 404

    # Start parsing the JSON data
    data = request.json # take in the new info to apply, if any.

    # Replace w/ new first_name, or default to current first_name.
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    # Commit the updated contact to the database
    db.session.commit()

    # Return success message + status
    return jsonify({"message": "User updated"}), 200

# Only run the entire file from itself.
if __name__ == "__main__":
    # Instantiate the DB by creating the defined models.
    with app.app_context():
        db.create_all()

    app.run(debug=True)
