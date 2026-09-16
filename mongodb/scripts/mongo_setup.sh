#!/bin/sh

echo "Starting primary db..."

use_mongo() {
  host=${1:-"mongodb1"}
  port=${MONGO_PORT:-27017}
  uname=${MONGODB_INITDB_ROOT_USERNAME:-"root"}
  passwrd=${MONGODB_INITDB_ROOT_PASSWORD:-"password"}

  shift

  mongosh --host "${host}:${port}" -u $uname -p $passwrd --authenticationDatabase admin --quiet $@
}

health_check_mongo() {
  host=${1:-"mongodb1"}
  echo "================"
  echo "Health Check: ${host}"
  echo "================"
  while ! use_mongo "${host}" --eval \"db.adminCommand\('ping'\)\"; do
    echo "${host}: Loading..."
    sleep 5
  done
  echo "================"
  echo "${host}: Ready!"
  echo "================"
  echo ""
}

health_check_mongo "mongodb1"
health_check_mongo "mongodb2"
health_check_mongo "mongodb3"

sleep 30





# #!/bin/bash
# sleep 10

# keep_running="true"
# counter=1

# connect() {
# echo SETUP.sh time now: `date +"%T" `
# mongosh --host mongodb1:$MONGO_PORT -u $MONGODB_INITDB_ROOT_USERNAME -p $MONGODB_INITDB_ROOT_PASSWORD --authenticationDatabase admin <<EOF
#  var cfg = {
#    "_id": "$MONGO_REPL_NAME",
#    "version": 1,
#    "members": [
#      {
#        "_id": 0,
#        "host": "mongodb1:$MONGO_PORT",
#        "priority": 2
#      },
#      {
#        "_id": 1,
#        "host": "mongodb2:$MONGO_PORT",
#        "priority": 1
#      },
#      {
#        "_id": 2,
#        "host": "mongodb3:$MONGO_PORT",
#        "priority": 0
#      }
#    ]
#  };
#  rs.initiate(cfg, { force: true });
#  rs.reconfig(cfg, { force: true });
#  rs.secondaryOk();
#  db.getMongo().setReadPref('nearest');
#  db.getMongo().setSecondaryOk();
# EOF
# }

# while [ $keep_running = "true" ]; do
#   echo "Attempting connection $counter times"

#   if connect; then
#     echo "Connected database!"
#     keep_running="false"
#   else
#     echo "Could not connect :("
#     echo ""
#     counter=$((counter + 1))
#     sleep 10
#   fi
# done


