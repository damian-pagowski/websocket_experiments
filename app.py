import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

history = "[modek]: hejka!"
users = []

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("submit_message")
def vote(data):
    global history
    global users
    username = data['username']
    users.append(username)
    message = data['message']
    if (message != None):
        history = history + "\n[%s]: %s" % (username, message)
    chat = {}
    chat['history'] = history
    chat['users'] = list(set(users))
    emit("new_message", chat, broadcast=True)


app.run(host='0.0.0.0', port=8080, debug=True)