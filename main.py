import os
import threading
import random

from flask import Flask, send_file, jsonify, request

from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo
)

from telegram.ext import *

from config import TOKEN

from database import *



create()



# ================= WEB =================


BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)


web = Flask(__name__)




@web.route("/")
def home():

    return send_file(

        os.path.join(
            BASE_DIR,
            "web",
            "index.html"
        )

    )




@web.route("/<path:file>")
def files(file):

    return send_file(

        os.path.join(
            BASE_DIR,
            "web",
            file
        )

    )






# ================= API =================



@web.route("/api/user")
def user():

    tg_id = request.args.get("id")


    if not tg_id:

        return jsonify({

            "error":"No user id"

        })



    data = get_user(
        int(tg_id)
    )


    if data:

        return jsonify({

            "wallet_id": data[3],

            "balance": data[4],

            "spins": data[7],

            "mining": data[5]

        })



    return jsonify({

        "error":"User not found"

    })






@web.route("/api/mine/start")
def mine_start():


    return jsonify({

        "message":
        "Mining Started"

    })






@web.route("/api/ad")
def ad():


    return jsonify({

        "message":
        "Ad Complete",

        "spin":1

    })






@web.route("/api/spin")
def spin():


    rewards = [
        1,2,3,4,5,
        6,7,8,9,10
    ]


    return jsonify({

        "reward":
        random.choice(rewards)

    })






@web.route("/api/send", methods=["POST"])
def send_coin():


    data = request.json


    amount = float(
        data.get("amount")
    )



    if amount < 100 or amount > 1000:


        return jsonify({

            "message":
            "Transfer limit 100-1000 SCN"

        })



    return jsonify({

        "message":
        "Transfer complete"

    })








def run_web():


    web.run(

        host="0.0.0.0",

        port=5000

    )





threading.Thread(

    target=run_web,

    daemon=True

).start()






# ================= TELEGRAM =================



async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):


    user = update.effective_user



    add_user(

        user.id,

        user.first_name

    )



    keyboard = [

        [

            InlineKeyboardButton(

                "📱 Open Silkcoin App",

                web_app=WebAppInfo(

                    url=
                    "https://silkcoin-network.onrender.com"

                )

            )

        ]

    ]



    await update.message.reply_text(


        """
🚀 Welcome to Silkcoin Network


Open your Wallet App

        """,


        reply_markup=
        InlineKeyboardMarkup(keyboard)

    )






async def error_handler(update, context):

    print(
        "BOT ERROR:",
        context.error
    )







app = Application.builder().token(TOKEN).build()



app.add_handler(

    CommandHandler(

        "start",

        start

    )

)



app.add_error_handler(

    error_handler

)




print(
    "🚀 Silkcoin Network Running"
)



app.run_polling()
