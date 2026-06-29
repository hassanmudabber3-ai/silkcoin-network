import os
import threading

from flask import Flask

from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes



BOT_TOKEN = os.environ.get("BOT_TOKEN")



server = Flask(__name__)



@server.route("/")
def home():
    return "Silkcoin Bot OK"




def run_server():

    port = int(os.environ.get("PORT",10000))

    server.run(
        host="0.0.0.0",
        port=port
    )




async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):

    await update.message.reply_text(
        "💎 Silkcoin Network Bot is working!"
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


    print("BOT STARTED")

    app.run_polling()





if __name__ == "__main__":

    threading.Thread(
        target=run_server
    ).start()


    run_bot()
