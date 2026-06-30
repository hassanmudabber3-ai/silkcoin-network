import os
import json
import time
import threading

from flask import (
    Flask,
    send_from_directory,
    request,
    jsonify
)

from telegram import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo
)

from telegram.ext import (
    Application,
    CommandHandler
)


BOT_TOKEN = os.environ.get("BOT_TOKEN")

WEB_APP_URL = "https://silkcoin-network.onrender.com"


DB_FILE = "users.json"


app = Flask(__name__)



# =====================
# DATABASE
# =====================

def load_users():

    if not os.path.exists(DB_FILE):

        return {}

    with open(
        DB_FILE,
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)




def save_users(users):

    with open(
        DB_FILE,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            users,
            f,
            indent=4,
            ensure_ascii=False
        )





# =====================
# WEBSITE
# =====================


@app.route("/")
def home():

    return send_from_directory(
        "public",
        "index.html"
    )




@app.route("/<path:file>")
def files(file):

    return send_from_directory(
        "public",
        file
    )






# =====================
# LOGIN REGISTER
# =====================


@app.route(
    "/login",
    methods=["POST"]
)

def login():


    data = request.json


    users = load_users()



    uid = str(
        data.get("id")
    )



    if uid not in users:


        users[uid] = {


            "id": uid,


            "name":
            data.get(
                "first_name",
                ""
            ),


            "username":
            data.get(
                "username",
                ""
            ),


            "balance":0,


            "mining_end":0,


            "spin_left":5


        }


        save_users(users)



    return jsonify(
        users[uid]
    )







# =====================
# MINING
# =====================


MINING_TIME = 24 * 60 * 60

MINING_REWARD = 1




@app.route(
"/check-mining/<uid>"
)

def check_mining(uid):


    users = load_users()


    if uid not in users:

        return jsonify(
            {
            "error":"not found"
            }
        )


    now = int(time.time())


    end = users[uid].get(
        "mining_end",
        0
    )


    return jsonify({

        "remaining":
        max(
            end-now,
            0
        ),


        "reward":
        MINING_REWARD,


        "balance":
        users[uid]["balance"]

    })







@app.route(
"/start-mining/<uid>",
methods=["POST"]
)

def start_mining(uid):


    users = load_users()


    now = int(time.time())


    if users[uid]["mining_end"] > now:


        return jsonify({

        "message":
        "already mining"

        })



    users[uid]["mining_end"] = (

        now + MINING_TIME

    )



    save_users(users)



    return jsonify({

        "message":
        "started"

    })







@app.route(
"/claim-mining/<uid>",
methods=["POST"]
)

def claim(uid):


    users = load_users()


    now = int(time.time())


    if now < users[uid]["mining_end"]:


        return jsonify({

        "message":
        "not finished"

        })




    users[uid]["balance"] += MINING_REWARD


    users[uid]["mining_end"]=0



    save_users(users)



    return jsonify({

        "message":
        "Claimed +1 SILK",

        "balance":
        users[uid]["balance"]

    })








# =====================
# TELEGRAM BOT
# =====================


async def start(update,context):


    keyboard=[

    [

    InlineKeyboardButton(

    "🚀 Open Silkcoin Network",

    web_app=WebAppInfo(
        url=WEB_APP_URL
    )

    )

    ]

    ]


    await update.message.reply_text(

    "💎 Silkcoin Network",

    reply_markup=
    InlineKeyboardMarkup(
        keyboard
    )

    )





def run_bot():


    bot = Application.builder().token(

        BOT_TOKEN

    ).build()



    bot.add_handler(

        CommandHandler(
            "start",
            start
        )

    )


    print(
        "🪙 Silkcoin Bot Started"
    )


    bot.run_polling()






def run_web():


    app.run(

    host="0.0.0.0",

    port=int(
        os.environ.get(
            "PORT",
            10000
        )
    )

    )







if __name__=="__main__":


    threading.Thread(

    target=run_web,

    daemon=True

    ).start()



    run_bot()
