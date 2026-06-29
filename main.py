import os

from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes
)



# ==========================
# Telegram Bot Token
# ==========================


TOKEN = os.getenv("TOKEN")





# ==========================
# Start Command
# ==========================


async def start(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):


    user = update.effective_user



    await update.message.reply_text(

        f"""
🪙 Silkcoin Network

Welcome {user.first_name}

Commands:

⛏ Mining
🎡 Lucky Spin
💰 Wallet

Your account is ready.
"""

    )







# ==========================
# Help
# ==========================


async def help_command(

    update: Update,

    context: ContextTypes.DEFAULT_TYPE

):


    await update.message.reply_text(

        """
Silkcoin Help:

/start - Start App

"""

    )







# ==========================
# Bot Run
# ==========================


def main():


    if not TOKEN:


        print(
            "ERROR: TOKEN not found"
        )

        return





    app = Application.builder()\
        .token(TOKEN)\
        .build()





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







if __name__ == "__main__":


    main()
