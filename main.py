import os

from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes
)


BOT_TOKEN = os.environ.get("BOT_TOKEN")



async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):

    print("START COMMAND RECEIVED")

    await update.message.reply_text(
        "💎 Silkcoin Bot is alive 🚀"
    )



def main():


    print("TOKEN CHECK:", bool(BOT_TOKEN))


    app = Application.builder().token(
        BOT_TOKEN
    ).build()



    app.add_handler(
        CommandHandler(
            "start",
            start
        )
    )



    print(
        "BOT RUNNING"
    )


    app.run_polling()





if __name__ == "__main__":

    main()
