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



# ======================
# SETTINGS
# ======================

BOT_TOKEN = "PUT_YOUR_BOT_TOKEN_HERE"

WEB_APP_URL = "https://YOUR-SILKCOIN-WEBSITE.com"



# ======================
# FLASK FOR RENDER PORT
# ======================

server = Flask(__name__)


@server.route("/")
def home():

    return "🪙 Silkcoin Bot Running"



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





# ======================
# TELEGRAM START
# ======================

async def start(

    update: Update,

    context: ContextTypes.DEFAULT_TYPE

):


    name = update.effective_user.first_name



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



    reply = InlineKeyboardMarkup(
        keyboard
    )



    await update.message.reply_text(

f"""
💎 Silkcoin Network

Welcome {name} 🚀


⛏ Mining every 24 hours

🎡 Lucky Spin

💰 Wallet


Open Silkcoin Network Coin:

""",

        reply_markup=reply

    )






# ======================
# HELP
# ======================

async def help_command(

    update: Update,

    context: ContextTypes.DEFAULT_TYPE

):


    await update.message.reply_text(

"""
💎 Silkcoin Help


/start - Open Silkcoin

⛏ Mining

🎡 Lucky Spin

💰 Wallet

"""

    )






# ======================
# BOT START
# ======================

def main():


    app = Application.builder().token(

        BOT_TOKEN

    ).build()



    app.add_handler(

        CommandHandler(

            "start",

            start

        )

    )



    app.add_handler(

        CommandHandler(

            "help",

            help_command

        )

    )



    print(
        "🪙 Silkcoin Telegram Bot Started"
    )


    app.run_polling()





# ======================
# RUN BOTH
# ======================

if __name__ == "__main__":


    threading.Thread(

        target=run_server

    ).start()



    main()
