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
# Silkcoin Bot Settings
# ==========================

BOT_TOKEN = "PUT_YOUR_BOT_TOKEN_HERE"

WEB_APP_URL = "https://YOUR-SILKCOIN-WEBAPP-URL.com"



# ==========================
# START COMMAND
# ==========================

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):

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


    button = InlineKeyboardMarkup(keyboard)



    await update.message.reply_text(

f"""
💎 Silkcoin Network

Welcome {user.first_name} 🚀


Your Silkcoin journey starts here.


⛏ Mine SILK every 24 hours

🎡 Lucky Spin

💰 Wallet

🌐 Silkcoin Network Coin

""",

        reply_markup=button

    )






# ==========================
# HELP COMMAND
# ==========================

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):


    await update.message.reply_text(

"""
💎 Silkcoin Network Help


⛏ Mining:
Every 24 hours


🎡 Lucky Spin:
Watch ads and earn spins


💰 Wallet:
Check your SILK


🚀 Open Web App from /start

"""

    )






# ==========================
# RUN BOT
# ==========================

def main():


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
        "💎 Silkcoin Bot is running..."
    )



    application.run_polling()






if __name__ == "__main__":

    main()
