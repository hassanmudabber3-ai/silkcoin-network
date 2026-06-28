from flask import Flask, send_from_directory, jsonify, request

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

from telegram.ext import *

from config import TOKEN

from database import *

import threading
import random


create()


# ---------- WEB APP ----------

web = Flask(__name__)


@web.route("/")
def home():
    return send_from_directory(
        "web",
        "index.html"
    )


@web.route("/<path:file>")
def files(file):
    return send_from_directory(
        "web",
        file
    )



# ---------- API USER ----------

@web.route("/api/user")
def user():

    tg_id = request.args.get("id")

    if not tg_id:
        return jsonify({
            "error": "No user id"
        })


    data = get_user(int(tg_id))


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





# ---------- MINING ----------

@web.route("/api/mine/start")
def start_mine():

    return jsonify({

        "message":"Mining Started"

    })





# ---------- AD BOOST ----------

@web.route("/api/ad")
def ad():

    return jsonify({

        "message":"Ad Complete",

        "spin":1

    })





# ---------- LUCKY WHEEL ----------

@web.route("/api/spin")
def spin():

    rewards = [
        1,2,3,4,5,
        6,7,8,9,10
    ]

    prize = random.choice(rewards)


    return jsonify({

        "reward": prize

    })





# ---------- P2P ----------

@web.route("/api/send", methods=["POST"])
def send_coin():

    data = request.json

    receiver = data.get("receiver")

    amount = float(data.get("amount"))


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






# ---------- TELEGRAM BOT ----------


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

            url="https://silkcoin-network.onrender.com"

            )

        )

        ]

    ]



    await update.message.reply_text(

        """
🚀 Welcome to Silkcoin Network


Open your Wallet App

        """,

        reply_markup=InlineKeyboardMarkup(keyboard)

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



print("🚀 Silkcoin Network Running")



app.run_polling()
