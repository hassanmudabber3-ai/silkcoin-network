import os
import asyncio

from flask import Flask
from threading import Thread

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



# =====================
# RENDER SERVER
# =====================

server = Flask(__name__)


@server.route("/")
def home():

    return "Silkcoin Bot Running"



def run_web():

    port = int(os.environ.get("PORT",10000))

    server.run(
        host="0.0.0.0",
        port=port
    )





# =====================
# TELEGRAM
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
        "Open Silkcoin:",

        reply_markup=InlineKeyboardMarkup(keyboard)

    )






async def run_bot():


    app = Application.builder().token(

        BOT_TOKEN

    ).build()



    app.add_handler(

        CommandHandler(

            "start",

            start

        )

    )



    print("🪙 Telegram Bot Started")



    await app.initialize()

    await app.start()

    await app.updater.start_polling()



    await asyncio.Event().wait()






if __name__ == "__main__":


    Thread(
        target=run_web
    ).start()


    asyncio.run(
        run_bot()
    )
