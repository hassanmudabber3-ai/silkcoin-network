from flask import Flask, send_from_directory, jsonify, request
import os


app = Flask(
    __name__,
    static_folder="public"
)



# ==========================
# Frontend
# ==========================


@app.route("/")
def home():

    return send_from_directory(
        "public",
        "index.html"
    )



@app.route("/<path:file>")
def public_files(file):

    return send_from_directory(
        "public",
        file
    )





# ==========================
# Test Backend
# ==========================


@app.route("/api/status")
def status():

    return jsonify({

        "name":"Silkcoin Network",

        "status":"online"

    })





# ==========================
# Register User
# ==========================


users = {}



@app.post("/api/register")
def register():


    data = request.json


    user_id = data.get(
        "telegram_id"
    )


    if user_id not in users:


        users[user_id] = {


            "wallet":

            "SILK"+str(user_id),


            "balance":0


        }



    return jsonify(
        users[user_id]
    )







# ==========================
# Run Server
# ==========================


PORT = int(
    os.environ.get(
        "PORT",
        10000
    )
)



app.run(

    host="0.0.0.0",

    port=PORT

)
