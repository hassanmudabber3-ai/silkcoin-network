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



# ==========================
# SETTINGS
# ==========================

BOT_TOKEN = "YOUR_BOT_TOKEN"

WEB_APP_URL = "https://YOUR-SILKCOIN-WEBAPP.com"



# ==========================
# RENDER PORT SERVER
# ==========================

server = Flask(__name__)


@server.route("/")
def index():

    return "🪙 Silkcoin Network Running"



def start_server():

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





# ==========================
# START COMMAND
# ==========================

async def start(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):


    user = update.effective_user



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



    button = InlineKeyboardMarkup(

        keyboard

    )




    await update.message.reply_text(


f"""
💎 Silkcoin Network


Welcome {user.first_name} 🚀


⛏ Mining

🎡 Lucky Spin

💰 Wallet


Open Silkcoin Network Coin below:

""",

        reply_markup=button

    )







# ==========================
# HELP
# ==========================

async def help_command(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):


    await update.message.reply_text(

"""
💎 Silkcoin Network


Commands:

/start
Open Silkcoin App


/help
Help


"""

    )






# ==========================
# BOT RUN
# ==========================

def start_bot():


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






# ==========================
# MAIN
# ==========================

if __name__ == "__main__":


    threading.Thread(

        target=start_server

    ).start()



    start_bot()
