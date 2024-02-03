from __init__ import app
from flask import render_template

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/prompt.html')
def prompt():
    return render_template("prompt.html")

@app.route('/gamePage.html')
def gamePage():
    return render_template("gamePage.html")

@app.route('/voting.html')
def voting():
    return render_template("voting.html")