import os
import threading
import random


from flask import Flask, send_from_directory, jsonify, request


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


    return send_from_directory(

        os.path.join(
            BASE_DIR,
            "web"
        ),

        "index.html"

    )






@web.route("/<path:file>")

def files(file):


    return send_from_directory(

        os.path.join(
            BASE_DIR,
            "web"
        ),

        file

    )








# ================= API =================




@web.route("/api/user")

def user():


    tg_id = request.args.get("id")



    if not tg_id:


        return jsonify({

            "error":
            "No user"

        })





    data = get_user(
        int(tg_id)
    )



    if data:


        return jsonify({

            "wallet":
            data[2],


            "balance":
            data[3]

        })




    return jsonify({

        "error":
        "Not found"

    })









@web.route("/api/mine")

def mine():


    user_id = request.args.get("id")



    if user_id:


        add_balance(

            int(user_id),

            5

        )



    return jsonify({

        "message":

        "Mining +5 SCN"

    })









@web.route("/api/spin")

def spin():


    user_id = request.args.get("id")


    reward = random.randint(
        1,
        10
    )



    if user_id:


        add_balance(

            int(user_id),

            reward

        )




    return jsonify({

        "reward":

        reward

    })









def run_web():


    port = int(

        os.environ.get(

            "PORT",

            5000

        )

    )



    web.run(

        host="0.0.0.0",

        port=port

    )







threading.Thread(

    target=run_web,

    daemon=True

).start()








# ================= BOT =================




async def start(update:Update, context):


    user = update.effective_user




    add_user(

        user.id,

        user.first_name

    )





    keyboard = [

        [

        InlineKeyboardButton(

            "🚀 Open Silkcoin",

            web_app=WebAppInfo(

                url=

                "https://silkcoin-network.onrender.com"

            )

        )

        ]

    ]





    await update.message.reply_text(


        "🚀 Welcome to Silkcoin Network",


        reply_markup=

        InlineKeyboardMarkup(

            keyboard

        )

    )









app = Application.builder().token(TOKEN).build()




app.add_handler(

    CommandHandler(

        "start",

        start

    )

)






print(

    "🚀 Silkcoin Network Running"

)





app.run_polling()
