#! /usr/bin/env python3
import random
import datetime
import json

def generateIP():
    return f'{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}'
        
now = {}
mons = []
for index in range(0,200):
    mons.append({
        "monitor":"M"+str(index),
        "ip":generateIP(),
        "exp":f'E{random.randint(0,5)}',
    })
    now["M"+str(index)] = datetime.datetime.now() - datetime.timedelta(days=random.randint(0,365));
    for mon in mons:
        mon["success"] = random.randint(0,1)
        # 1-6 hours space between experiments on a monitor
        now[mon["monitor"]] -= datetime.timedelta(hours=random.randint(1,6))
        mon["end"] = now[mon["monitor"]].timestamp()
        mon["data"] = {}
        # Experiment duraction 1-12 hours
        now[mon["monitor"]] -= datetime.timedelta(hours=random.randint(1,12))
        mon["start"] = now[mon["monitor"]].timestamp()
        if random.random() < .1:
            while True:
                ip = generateIP()
                if ip != mon["ip"]:
                    mon["ip"] = ip
                    break
        if random.random() < .3:
            while True:
                exp = f'E{random.randint(0,100)}'
                if exp != mon["exp"]:
                    mon["exp"] = exp
                    break
        print (json.dumps(mon))
