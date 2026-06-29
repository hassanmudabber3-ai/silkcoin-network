import os

TOKEN = os.getenv("BOT_TOKEN")


MINING_RATES = [

    {
        "min":0,
        "max":10000,
        "rate":2
    },

    {
        "min":10000,
        "max":100000,
        "rate":1.2
    },

    {
        "min":100000,
        "max":1000000,
        "rate":0.5
    },

    {
        "min":1000000,
        "max":10000000,
        "rate":0.2
    }

]


def get_mining_rate(users):

    for r in MINING_RATES:

        if users >= r["min"] and users < r["max"]:

            return r["rate"]


    return 0.1
