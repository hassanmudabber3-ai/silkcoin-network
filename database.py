import sqlite3
import random


DB = "database.db"



def connect():

    return sqlite3.connect(DB)





def create():

    con = connect()

    cur = con.cursor()


    cur.execute("""
    CREATE TABLE IF NOT EXISTS users(

        id INTEGER PRIMARY KEY,

        name TEXT,

        wallet TEXT,

        balance INTEGER DEFAULT 0,

        mining INTEGER DEFAULT 0,

        spins INTEGER DEFAULT 0,

        referrals INTEGER DEFAULT 0

    )
    """)


    con.commit()

    con.close()







def add_user(user_id, name):

    con = connect()

    cur = con.cursor()



    cur.execute(
        "SELECT id FROM users WHERE id=?",
        (user_id,)
    )


    if not cur.fetchone():


        wallet = "SCN-" + str(
            random.randint(100000,999999)
        )


        cur.execute(
        """
        INSERT INTO users
        (id,name,wallet)
        VALUES (?,?,?)
        """,
        (
            user_id,
            name,
            wallet
        )
        )



    con.commit()

    con.close()







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
