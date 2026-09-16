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

# sleep 10 | echo "sleeping"
mongo mongodb://primary:27017 replica-set-configs.js