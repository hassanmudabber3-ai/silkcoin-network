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



BOT_TOKEN = os.environ.get("BOT_TOKEN")

WEB_APP_URL = "https://silkcoin-network.onrender.com"



# ------------------
# Render Web Server
# ------------------

web = Flask(__name__)


@web.route("/")
def home():
    return "Silkcoin Bot Running"



def run_web():

    port = int(os.environ.get("PORT",10000))

    web.run(
        host="0.0.0.0",
        port=port
    )





# ------------------
# Telegram
# ------------------

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
        "Open Silkcoin Network Coin:",

        reply_markup=InlineKeyboardMarkup(keyboard)

    )





async def bot_main():


    application = Application.builder().token(

        BOT_TOKEN

    ).build()



    application.add_handler(

        CommandHandler(
            "start",
            start
        )

    )


    print("🪙 Telegram Connected")



    await application.initialize()

    await application.start()

    await application.updater.start_polling()



    while True:

        await asyncio.sleep(60)





# ------------------
# RUN
# ------------------

if __name__ == "__main__":


    threading.Thread(
        target=run_web
    ).start()



    asyncio.run(
        bot_main()
    )
