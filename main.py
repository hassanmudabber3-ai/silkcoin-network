import os
import json
import time
import random
import threading


from flask import (
    Flask,
    request,
    jsonify,
    send_from_directory
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





BOT_TOKEN = os.environ.get(
    "BOT_TOKEN"
)


WEB_APP_URL = (
"https://silkcoin-network.onrender.com"
)



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
        data["id"]
    )




    if uid not in users:



        users[uid] = {


            "id":uid,


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



            "spin_left":5,



            "history":[]


        }



        save_users(users)






    return jsonify(

        users[uid]

    )









# =====================
# MINING
# =====================



MINING_TIME = 86400

MINING_REWARD = 1





@app.route(
"/start-mining/<uid>",
methods=["POST"]
)

def start_mining(uid):


    users = load_users()


    now = int(
        time.time()
    )



    if users[uid]["mining_end"] > now:


        return jsonify({

            "message":
            "Mining active"

        })




    users[uid]["mining_end"] = (

        now + MINING_TIME

    )



    save_users(users)



    return jsonify({

        "message":
        "Mining started"

    })









@app.route(
"/check-mining/<uid>"
)

def check_mining(uid):


    users = load_users()



    now = int(
        time.time()
    )



    remain = (

        users[uid]["mining_end"]

        -

        now

    )



    return jsonify({

        "remaining":
        max(remain,0),


        "reward":
        MINING_REWARD

    })









@app.route(
"/claim-mining/<uid>",
methods=["POST"]
)

def claim_mining(uid):


    users = load_users()



    now = int(
        time.time()
    )



    if now < users[uid]["mining_end"]:


        return jsonify({

            "message":
            "Not finished"

        })





    users[uid]["balance"] += MINING_REWARD



    users[uid]["mining_end"]=0




    users[uid]["history"].append({

        "type":
        "Mining",


        "amount":
        MINING_REWARD,


        "time":
        time.strftime(
            "%Y-%m-%d %H:%M"
        )


    })



    save_users(users)




    return jsonify({

        "message":
        "Mining reward added"

    })









# =====================
# SPIN
# =====================



SPIN_PRIZES=[

0.5,

1,

1.5,

2,

2.5,

3,

3.5,

4,

4.5,

5

]






@app.route(
"/spin-play/<uid>",
methods=["POST"]
)

def spin_play(uid):


    users = load_users()




    if users[uid]["spin_left"] <=0:


        return jsonify({

        "message":
        "No spin"

        })





    reward = random.choice(

        SPIN_PRIZES

    )





    users[uid]["balance"] += reward



    users[uid]["spin_left"] -= 1






    users[uid]["history"].append({


        "type":
        "Lucky Spin",



        "amount":
        reward,



        "time":
        time.strftime(
            "%Y-%m-%d %H:%M"
        )


    })





    save_users(users)




    return jsonify({

        "reward":
        reward,


        "balance":
        users[uid]["balance"],


        "spin_left":
        users[uid]["spin_left"]


    })









# =====================
# WALLET
# =====================



@app.route(
"/wallet/<uid>"
)


def wallet(uid):


    users = load_users()



    return jsonify(

        users[uid]

    )









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
