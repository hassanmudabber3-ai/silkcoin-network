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



# ==========================
# RENDER ENV
# ==========================

BOT_TOKEN = os.environ.get("BOT_TOKEN")

WEB_APP_URL = os.environ.get(
    "WEB_APP_URL",
    "https://silkcoin-network.onrender.com"
)




# ==========================
# WEB SERVER FOR RENDER
# ==========================

server = Flask(__name__)



@server.route("/")
def home():

    return "🪙 Silkcoin Network Bot Running"





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






# ==========================
# TELEGRAM START
# ==========================

async def start(

    update: Update,

    context: ContextTypes.DEFAULT_TYPE

):


    user = update.effective_user.first_name



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

f"""
💎 Silkcoin Network


Welcome {user} 🚀


⛏ Mining every 24 hours

🎡 Lucky Spin

💰 Wallet


Open Silkcoin Network Coin:

""",

        reply_markup=InlineKeyboardMarkup(
            keyboard
        )

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


/start
Open Silkcoin


/help
Help

"""

    )







# ==========================
# BOT
# ==========================

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



    while True:

        await asyncio.sleep(60)








# ==========================
# MAIN
# ==========================

if __name__ == "__main__":



    threading.Thread(

        target=run_web

    ).start()



    asyncio.run(

        run_bot()

    )
