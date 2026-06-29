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



# برای Render
server = Flask(__name__)


@server.route("/")
def home():
    return "Silkcoin Bot Running"



def run_server():

    port = int(os.environ.get("PORT",10000))

    server.run(
        host="0.0.0.0",
        port=port
    )





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
        "Click Open to enter Silkcoin:",

        reply_markup=InlineKeyboardMarkup(keyboard)

    )





def run_bot():


    app = Application.builder().token(
        BOT_TOKEN
    ).build()



    app.add_handler(

        CommandHandler(
            "start",
            start
        )

    )


    print("🪙 Silkcoin Bot Started")


    app.run_polling()





if __name__ == "__main__":


    threading.Thread(
        target=run_server
    ).start()


    run_bot()
