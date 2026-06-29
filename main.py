from flask import Flask, send_from_directory
import os


app = Flask(__name__, static_folder="public")



@app.route("/")
def home():

    return send_from_directory(
        "public",
        "index.html"
    )



@app.route("/<path:path>")
def files(path):

    return send_from_directory(
        "public",
        path
    )



PORT = int(os.environ.get("PORT", 10000))


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=PORT
    )
