#!/bin/bash

echo "Securing mongo instance..."
if [ ! -f /mongodb-keyfile ]; then
  openssl rand -base64 756 > /mongodb-keyfile
  chmod 400 /mongodb-keyfile
  chown 999:999 /mongodb-keyfile
  # chown mongodb:mongodb /mongodb-keyfile
  echo
  echo 'Keyfile created successfully'
  echo
else
  echo 'Keyfile exists'
fi
echo ""


echo "Dropping privileges to mongod..."
# gosu -v
# exec gosu mongod "$@"
# exec su-exec mongod "$@"