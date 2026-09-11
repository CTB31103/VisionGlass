#!/bin/bash
sleep 10

echo SETUP.sh time now: `date +"%T" `
mongosh --host mongodb1:$MONGO_PORT <<EOF
 var cfg = {
   "_id": "$MONGO_REPL_NAME",
   "version": 1,
   "members": [
     {
       "_id": 0,
       "host": "mongodb1:$MONGO_PORT",
       "priority": 2
     },
     {
       "_id": 1,
       "host": "mongodb2:$MONGO_PORT",
       "priority": 1
     },
     {
       "_id": 2,
       "host": "mongodb3:$MONGO_PORT",
       "priority": 0
     }
   ]
 };
 rs.initiate(cfg, { force: true });
 rs.reconfig(cfg, { force: true });
 rs.secondaryOk();
 db.getMongo().setReadPref('nearest');
 db.getMongo().setSecondaryOk();
EOF
