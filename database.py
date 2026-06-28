import sqlite3
import time


db = sqlite3.connect("silkcoin.db", check_same_thread=False)

cur = db.cursor()


def create():

    cur.execute("""
    CREATE TABLE IF NOT EXISTS users(

        id INTEGER PRIMARY KEY,

        username TEXT,

        balance REAL DEFAULT 0,

        speed REAL DEFAULT 1,

        last_claim INTEGER,

        inviter INTEGER DEFAULT 0,

        referrals INTEGER DEFAULT 0

    )
    """)

    db.commit()



def add_user(uid, name, inviter=0):

    cur.execute(
    "SELECT id FROM users WHERE id=?",
    (uid,)
    )

    if cur.fetchone() is None:


        cur.execute(
        """
        INSERT INTO users
        (id, username, last_claim, inviter)

        VALUES(?,?,?,?)

        """,

        (uid,name,int(time.time()),inviter)
        )


        if inviter != 0:

            cur.execute(
            """
            UPDATE users

            SET balance = balance + 100,

            referrals = referrals + 1

            WHERE id=?

            """,

            (inviter,)
            )


        db.commit()



def get_user(uid):

    cur.execute(
    "SELECT * FROM users WHERE id=?",
    (uid,)
    )

    return cur.fetchone()



def mine(uid):

    user=get_user(uid)

    now=int(time.time())

    seconds = now - user[4]


    hours = seconds / 3600


    reward = hours * user[3]


    cur.execute(
    """
    UPDATE users

    SET balance = balance + ?,

    last_claim = ?

    WHERE id=?

    """,

    (reward,now,uid)
    )


    db.commit()


    return reward



def boost(uid):

    cur.execute(
    """
    UPDATE users

    SET speed = speed + 1

    WHERE id=?

    """,

    (uid,)
    )

    db.commit()