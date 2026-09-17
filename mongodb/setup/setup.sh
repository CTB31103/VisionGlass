#!/bin/bash
echo ******************************
echo "starting the replica set"
echo ******************************

ping() {
  host=${1:-"mongodb1"}
  port=${MONGO_PORT:-27017}

  shift

  mongo "mongodb://${host}:${port}" $@
}

while ! ping "primary" --eval \"db.adminCommand\('ping'\)\"; do
  echo "Ping failed 'primary' DB..."
  sleep 3
done
echo "DB 'primary' ready!"
echo 
while ! ping "secondary-1" --eval \"db.adminCommand\('ping'\)\"; do
  echo "Ping failed 'secondary-1' DB..."
  sleep 3
done
echo "DB 'secondary-1' ready!"
echo 
while ! ping "secondary-2" --eval \"db.adminCommand\('ping'\)\"; do
  echo "Ping failed 'secondary-2' DB..."
  sleep 3
done
echo "DB 'secondary-2' ready!"
echo 

mongo --host mongodb://primary:$MONGO_PORT  <<EOF
cfg = {
  _id: $MONGO_REPL_NAME,
  members: [
    {
      _id: 0,
      host: "primary:$MONGO_PORT",
      priority: 2,
    },
    {
      _id: 1,
      host: "secondary-1:$MONGO_PORT",
      priority: 1,
    },
    {
      _id: 2,
      host: "secondary-2:$MONGO_PORT",
      priority: 0,
    },
  ],
};

rs.initiate(cfg, { force: true });
rs.reconfig(cfg, { force: true });
rs.secondaryOk();
db.getMongo().setReadPref("nearest");
db.getMongo().setSecondaryOk();
EOF