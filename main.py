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

WEB_APP_URL = "https://silkcoin-network.onrender.com"




# ==================
# RENDER SERVER
# ==================

app_web = Flask(__name__)


@app_web.route("/")
def home():

    return "Silkcoin Bot Running"




def run_web():

    port = int(
        os.environ.get(
            "PORT",
            10000
        )
    )

    app_web.run(

        host="0.0.0.0",

        port=port

    )





# ==================
# TELEGRAM BOT
# ==================


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
        "Welcome 🚀\n\n"
        "Click below to open Silkcoin:",

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





# ==================
# START
# ==================

if __name__ == "__main__":


    threading.Thread(

        target=run_web

    ).start()



    run_bot()
