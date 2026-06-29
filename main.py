import os
import threading
import asyncio

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



# =====================
# Render Environment
# =====================

BOT_TOKEN = os.environ.get("BOT_TOKEN")

WEB_APP_URL = os.environ.get(
    "WEB_APP_URL",
    "https://silkcoin-network.onrender.com"
)



# =====================
# Flask Server
# =====================

server = Flask(__name__)


@server.route("/")
def home():

    return "Silkcoin Bot Running"




def run_server():

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
# Telegram Bot
# =====================

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
        "Start mining SILK now.\n\n"
        "Click below:",

        reply_markup=InlineKeyboardMarkup(
            keyboard
        )

    )







async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):


    await update.message.reply_text(

        "💎 Silkcoin Help\n\n"
        "/start - Open Silkcoin"

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



    application.add_handler(

        CommandHandler(
            "help",
            help_command
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
# Start
# =====================

if __name__ == "__main__":


    threading.Thread(

        target=run_server

    ).start()



    asyncio.run(

        run_bot()

    )
