import os
import threading

from flask import Flask

from telegram import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo
)

from telegram.ext import (
    Application,
    CommandHandler
)



# ======================
# SETTINGS
# ======================

BOT_TOKEN = os.environ.get("BOT_TOKEN")

WEB_APP_URL = os.environ.get(
    "WEB_APP_URL",
    "https://silkcoin-network.onrender.com"
)



# ======================
# WEB SERVER (RENDER)
# ======================

server = Flask(__name__)


@server.route("/")
def home():

    return "Silkcoin Bot Running"




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






# ======================
# TELEGRAM BOT
# ======================


async def start(update, context):


    keyboard = [

        [

            InlineKeyboardButton(

                text="🚀 Open Silkcoin Network Coin",

                web_app=WebAppInfo(

                    url=WEB_APP_URL

                )

            )

        ]

    ]



    await update.message.reply_text(

        "💎 Silkcoin Network\n\n"
        "Welcome 🚀\n\n"
        "Start mining SILK now.\n\n"
        "Click below to open:",

        reply_markup=InlineKeyboardMarkup(
            keyboard
        )

    )






async def help_command(update, context):


    await update.message.reply_text(

        "💎 Silkcoin Help\n\n"
        "/start - Open Silkcoin"

    )






def run_bot():


    application = Application.builder().token(

        BOT_TOKEN

    ).build()



    application.add_handler(

        CommandHandler(

            "start",

            start

        )

    )



    application.add_handler(

        CommandHandler(

            "help",

            help_command

        )

    )



    print(

        "🪙 Silkcoin Telegram Bot Started"

    )



    application.run_polling()






# ======================
# START
# ======================

if __name__ == "__main__":


    threading.Thread(

        target=run_web,

        daemon=True

    ).start()



    print(

        "🌐 Web Server Started"

    )



    run_bot()
