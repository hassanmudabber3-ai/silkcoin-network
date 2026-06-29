import os
import threading

from flask import (
    Flask,
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



BOT_TOKEN = os.environ.get("BOT_TOKEN")

WEB_APP_URL = os.environ.get(
    "WEB_APP_URL",
    "https://silkcoin-network.onrender.com"
)



# =====================
# FLASK WEBSITE
# =====================

server = Flask(
    __name__,
    static_folder="public"
)



@server.route("/")
def index():

    return send_from_directory(
        "public",
        "index.html"
    )



@server.route("/<path:file>")
def files(file):

    return send_from_directory(
        "public",
        file
    )




def run_web():

    port = int(
        os.environ.get(
            "PORT",
            10000
        )
    )


    server.run(

        host="0.0.0.0",

        port=port

    )





# =====================
# TELEGRAM BOT
# =====================


async def start(update, context):


    keyboard = [

        [

            InlineKeyboardButton(

                "🚀 Open Silkcoin Network Coin",

                web_app=WebAppInfo(

                    url=WEB_APP_URL

                )

            )

        ]

    ]



    await update.message.reply_text(

        "💎 Silkcoin Network\n\n"
        "Welcome 🚀\n\n"
        "Open your account:",

        reply_markup=InlineKeyboardMarkup(
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
        "🪙 Silkcoin Telegram Bot Started"
    )



    bot.run_polling()






# =====================
# START
# =====================

if __name__ == "__main__":


    threading.Thread(

        target=run_web,

        daemon=True

    ).start()



    run_bot()
