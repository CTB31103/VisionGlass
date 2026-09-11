#!/bin/bash

set -e

BACKUP_NAME=$(date +%y%m%d_%H%M%S).gz

date
echo "Backing up MongoDB database"

echo "Dumping MongoDB $MONGO_DATABASE_NAME database to compressed archive: $BACKUP_NAME"
mongodump --port $MONGO_PORT --db $MONGO_DATABASE_NAME --archive=/data/db/backups/$BACKUP_NAME --gzip >> /data/db/backups/logs

echo 'Backup completed successfully!'
