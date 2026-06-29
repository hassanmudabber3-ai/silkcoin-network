import os
import threading
import asyncio

from flask import Flask, send_from_directory

from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo
)

from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes
)



BOT_TOKEN = os.environ.get("BOT_TOKEN")

WEB_APP_URL = os.environ.get(
    "WEB_APP_URL",
    "https://silkcoin-network.onrender.com"
)



# =====================
# WEBSITE
# =====================

server = Flask(__name__)


@server.route("/")
def index():

    return send_from_directory(
        "public",
        "index.html"
    )



@server.route("/<path:file>")
def public_files(file):

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
# TELEGRAM
# =====================

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):


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
        "Welcome 🚀",

        reply_markup=InlineKeyboardMarkup(
            keyboard
        )

    )





async def run_bot():


    application = Application.builder().token(
        BOT_TOKEN
    ).build()



    application.add_handler(

        CommandHandler(
            "start",
            start
        )

    )



    print(
        "🪙 Silkcoin Telegram Bot Started"
    )



    await application.initialize()

    await application.start()

    await application.updater.start_polling()



    await asyncio.Event().wait()






# =====================
# START
# =====================

if __name__ == "__main__":


    threading.Thread(

        target=run_web,

        daemon=True

    ).start()



    asyncio.run(
        run_bot()
    )
