import sqlite3
import random
import time
from datetime import datetime


DB = "database.db"


MAX_SUPPLY = 100000000000



def connect():

    return sqlite3.connect(DB)





def create():

    con = connect()

    cur = con.cursor()



    cur.execute("""
    CREATE TABLE IF NOT EXISTS users(

        id INTEGER PRIMARY KEY,

        name TEXT,

        device_id TEXT UNIQUE,

        wallet TEXT UNIQUE,

        balance REAL DEFAULT 0,

        mining_start INTEGER DEFAULT 0,

        mining_end INTEGER DEFAULT 0,

        spins INTEGER DEFAULT 5,

        last_spin TEXT

    )
    """)



    cur.execute("""
    CREATE TABLE IF NOT EXISTS network(

        id INTEGER PRIMARY KEY,

        supply REAL DEFAULT 0

    )
    """)



    cur.execute(

        "INSERT OR IGNORE INTO network(id) VALUES(1)"

    )


    con.commit()

    con.close()






# ساخت کاربر با ضد چند اکانت دستگاه

def add_user(user_id, name, device_id):


    con = connect()

    cur = con.cursor()



    # آیا این دستگاه قبلا ثبت شده؟

    cur.execute(

    "SELECT id FROM users WHERE device_id=?",

    (device_id,)

    )


    old = cur.fetchone()



    if old:

        return False




    wallet = "SCN-" + str(

        random.randint(100000,999999)

    )



    cur.execute(

    """

    INSERT INTO users

    (id,name,device_id,wallet)

    VALUES(?,?,?,?)

    """,

    (

    user_id,

    name,

    device_id,

    wallet

    )

    )



    con.commit()

    con.close()



    return True







def get_user(user_id):


    con = connect()

    cur = con.cursor()



    cur.execute(

    "SELECT * FROM users WHERE id=?",

    (user_id,)

    )



    data = cur.fetchone()



    con.close()



    return data








# نرخ کاهش ماینینگ

def mining_rate():


    con=connect()

    cur=con.cursor()



    cur.execute(

    "SELECT supply FROM network WHERE id=1"

    )


    supply=cur.fetchone()[0]



    percent=supply/MAX_SUPPLY



    if percent < 0.25:

        return 1


    elif percent < 0.50:

        return 0.5


    elif percent < 0.75:

        return 0.25


    elif percent < 0.90:

        return 0.125


    return 0.01







# شروع ماین 24 ساعته

def start_mining(user_id):


    now=int(time.time())


    end=now+(24*60*60)



    con=connect()

    cur=con.cursor()



    cur.execute(

    """

    UPDATE users

    SET mining_start=?,

    mining_end=?

    WHERE id=?

    """,

    (

    now,

    end,

    user_id

    )

    )


    con.commit()

    con.close()






# دریافت پاداش بعد از 24 ساعت

def claim_mining(user_id):


    con=connect()

    cur=con.cursor()



    cur.execute(

    """

    SELECT mining_end

    FROM users

    WHERE id=?

    """,

    (user_id,)

    )


    data=cur.fetchone()



    if not data:

        con.close()

        return 0



    if int(time.time()) < data[0]:

        con.close()

        return -1




    reward=mining_rate()



    cur.execute(

    """

    UPDATE users

    SET balance=balance+?

    WHERE id=?

    """,

    (

    reward,

    user_id

    )

    )



    cur.execute(

    """

    UPDATE network

    SET supply=supply+?

    WHERE id=1

    """,

    (reward,)

    )



    con.commit()

    con.close()



    return reward
