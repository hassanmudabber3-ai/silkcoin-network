import os
import threading

from flask import Flask

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



# Render port
server = Flask(__name__)


@server.route("/")
def home():
    return "Silkcoin Network OK"



def run_server():

    port = int(os.environ.get("PORT", 10000))

    server.run(
        host="0.0.0.0",
        port=port
    )




# Telegram start

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):


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
        "Click below to open Silkcoin:",

        reply_markup=InlineKeyboardMarkup(keyboard)

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



    print("🪙 Silkcoin Telegram Bot Started")


    application.run_polling()





if __name__ == "__main__":


    threading.Thread(
        target=run_server
    ).start()



    run_bot()
