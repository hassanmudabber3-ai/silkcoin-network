from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo
)

from telegram.ext import *

from flask import Flask, send_from_directory

from config import TOKEN

from database import *

import threading



create()



# -------- WEB APP --------

web = Flask(__name__)

@web.route("/")
def home():
    return send_from_directory(".", "index.html")


@web.route("/style.css")
def style():
    return send_from_directory(".", "style.css")


def start_web():
    web.run(
        host="0.0.0.0",
        port=5000
    )


threading.Thread(
    target=start_web
).start()





# -------- TELEGRAM BOT --------


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):

    user = update.effective_user


    inviter = 0


    if context.args:

        inviter = int(context.args[0])


    add_user(
        user.id,
        user.first_name,
        inviter
    )



    keyboard = [


        [

        InlineKeyboardButton(

        "📱 Open Silkcoin App",

        web_app=WebAppInfo(

        url="https://silkcoin-network.onrender.com"

        )

        )

        ],



        [

        InlineKeyboardButton(

        "⛏ Start Mining",

        callback_data="mine"

        )

        ],



        [

        InlineKeyboardButton(

        "💰 Balance",

        callback_data="balance"

        )

        ],



        [

        InlineKeyboardButton(

        "👥 Invite Friends",

        callback_data="ref"

        )

        ],



        [

        InlineKeyboardButton(

        "⚡ Ad Boost",

        callback_data="ad"

        )

        ]

    ]



    await update.message.reply_text(

f"""

🚀 Welcome to Silkcoin Network


⛏ 24/7 Mining Active


User:

{user.first_name}



Choose:

""",

reply_markup=InlineKeyboardMarkup(keyboard)

)






async def button(update:Update, context:ContextTypes.DEFAULT_TYPE):


    query = update.callback_query


    uid = query.from_user.id


    await query.answer()



    if query.data=="mine":


        reward = mine(uid)



        await query.edit_message_text(

f"""

⛏ Mining Complete


+{reward:.4f} SCN


Mining Active ⚡

"""

)




    elif query.data=="balance":


        user=get_user(uid)


        await query.edit_message_text(

f"""

💰 Silkcoin Balance


{user[2]:.4f} SCN



⚡ Speed:

{user[3]} SCN/hour


👥 Referrals:

{user[6]}

"""

)




    elif query.data=="ref":


        await query.edit_message_text(

f"""

👥 Invite Friends


Your referral link:


https://t.me/{context.bot.username}?start={uid}



Reward:

100 SCN per friend

"""

)




    elif query.data=="ad":


        boost(uid)



        await query.edit_message_text(

"""

✅ Advertisement Completed


⚡ Mining Speed Increased

"""

)







app = Application.builder().token(TOKEN).build()



app.add_handler(
CommandHandler("start", start)
)



app.add_handler(
CallbackQueryHandler(button)
)



print("🚀 Silkcoin Network Running")



app.run_polling()
