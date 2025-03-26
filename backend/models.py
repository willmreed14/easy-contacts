""" Database Models """

# Relative Import - import the db we defined in config.py
from config import db


# SQL Database Model
# Represented as a Python class
# So now in Python code we can define the model
class Contact(db.Model):
    """Database model for storing contact information."""

    id = db.Column(db.Integer, primary_key=True)  # id is an int,
    # and each id must be unique since it is the primary key.
    first_name = db.Column(
        db.String(80), unique=False, nullable=False
    )  # first_name is a string w/
    # a max length of 80 characters; it does not have to be unique,
    # but it must have a value (cannot be None).
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(
        db.String(20), unique=False, nullable=True
    )  # Making it nullable in case some contacts don't have phone numbers

    def to_json(self):
        """
        Take all the fields from the constructor,
        convert to a python dictionary, and then
        turn them into JSON so that we can pass it from our API.
        """
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "phone": self.phone,
        }
