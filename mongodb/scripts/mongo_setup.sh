#!/bin/bash
sleep 10

keep_running="true"
counter=1

connect() {
echo SETUP.sh time now: `date +"%T" `
mongosh --host mongodb1:$MONGO_PORT -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin <<EOF
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
}

while [ $keep_running = "true" ]; do
  echo "Attempting connection $counter times"

  if connect; then
    echo "Connected database!"
    keep_running="false"
  else
    echo "Could not connect :("
    echo ""
    counter=$((counter + 1))
    sleep 10
  fi
done


