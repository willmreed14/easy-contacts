"""Configuration module for the Flask backend application."""

# Main config file for the backend

# Build API using Flask
from flask import Flask

# Convert SQL commands to a Python class for ease of use
from flask_sqlalchemy import SQLAlchemy

# Cross-Origin Request:
# Send a request to this backend from a different URL.
from flask_cors import CORS

# Initialize Flask application
app = Flask(__name__)

# Wrap the app in CORS (disable CORS protection error),
# allowing us to send cross-origin requests (backend-frontend).
CORS(app)

# Initialize database stuff

# Specify location of local sqlite database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"

# Don't track all mods we make to the database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Create an instance of the database
# ORM: Object-Relational Mapping
# Aka, Python class mapped to SQL database
db = SQLAlchemy(app)
