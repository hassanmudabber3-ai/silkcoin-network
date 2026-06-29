import os
import threading
import random


from flask import Flask, send_from_directory, jsonify, request


from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo
)


from telegram.ext import *


from config import TOKEN

from database import *




create()



BASE_DIR=os.path.dirname(
    os.path.abspath(__file__)
)



web=Flask(__name__)





# ================= WEB =================


@web.route("/")

def home():

    return send_from_directory(

        os.path.join(BASE_DIR,"web"),

        "index.html"

    )





@web.route("/<path:file>")

def files(file):

    return send_from_directory(

        os.path.join(BASE_DIR,"web"),

        file

    )







# ================= LOGIN =================



@web.route("/api/login")

def login():


    uid=request.args.get("id")

    device=request.args.get("device")



    if not uid or not device:

        return jsonify({

            "error":"Missing data"

        })




    user=get_user(

        int(uid)

    )



    if user:


        if user[2] != device:


            return jsonify({

                "error":

                "Another device detected"

            })



        return jsonify({

            "success":True

        })






    add_user(

        int(uid),

        "Silk User",

        device

    )



    return jsonify({

        "success":True

    })









# ================= USER =================



@web.route("/api/user")

def user():


    uid=request.args.get("id")



    data=get_user(

        int(uid)

    )



    if data:


        return jsonify({

            "wallet":data[3],

            "balance":data[4],

            "spins":data[7]

        })



    return jsonify({

        "error":"User not found"

    })









# ================= MINING =================



@web.route("/api/mine/start")

def mine_start():


    uid=request.args.get("id")



    start_mining(

        int(uid)

    )



    return jsonify({

        "message":

        "Mining started 24h"

    })









@web.route("/api/mine/claim")

def mine_claim():


    uid=request.args.get("id")



    reward=claim_mining(

        int(uid)

    )



    if reward == -1:


        return jsonify({

            "message":

            "Not finished"

        })




    return jsonify({

        "reward":

        reward

    })











# ================= SPIN =================



@web.route("/api/spin")

def spin():


    uid=request.args.get("id")



    data=get_user(

        int(uid)

    )



    if data[7] <=0:


        return jsonify({

            "message":

            "No spin"

        })




    prize=random.randint(

        1,

        10

    )



    con=connect()

    cur=con.cursor()



    cur.execute(

    """

    UPDATE users

    SET balance=balance+?,

    spins=spins-1

    WHERE id=?

    """,

    (

    prize,

    int(uid)

    )

    )



    con.commit()

    con.close()



    return jsonify({

        "reward":

        prize

    })









# ================= AD =================



@web.route("/api/ad")

def ad():


    uid=request.args.get("id")



    con=connect()

    cur=con.cursor()



    cur.execute(

    """

    UPDATE users

    SET spins=spins+1

    WHERE id=?

    """,

    (int(uid),)

    )


    con.commit()

    con.close()



    return jsonify({

        "message":

        "+1 Spin"

    })











# ================= SERVER =================



def run_web():

    port=int(

        os.environ.get(

            "PORT",

            5000

        )

    )


    web.run(

        host="0.0.0.0",

        port=port

    )





threading.Thread(

    target=run_web,

    daemon=True

).start()









# ================= BOT =================



async def start(update:Update,context):


    user=update.effective_user



    keyboard=[

    [

    InlineKeyboardButton(

        "🚀 Open Silkcoin",

        web_app=WebAppInfo(

        url="https://silkcoin-network.onrender.com"

        )

    )

    ]

    ]



    await update.message.reply_text(

        "🚀 Silkcoin Secure",

        reply_markup=

        InlineKeyboardMarkup(keyboard)

    )









app=Application.builder().token(TOKEN).build()



app.add_handler(

CommandHandler(

"start",

start

)

)



print(

"🚀 Silkcoin Running"

)



app.run_polling()
