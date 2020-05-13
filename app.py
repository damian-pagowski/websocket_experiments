import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

votes = {"yes": 0, "no": 0, "maybe": 0}


@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("submit_vote")
def vote(data):
    # selection = data["selection"]
    # emit("announce vote", {"selection": selection}, broadcast=True)

    selection = data["selection"]
    votes[selection] += 1
    emit("vote totals", votes, broadcast=True)


app.run(host='0.0.0.0', port=8080, debug=True)