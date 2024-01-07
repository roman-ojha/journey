#!/bin/bash
set -e

# Check if the DATABASE_TYPE environment variable is set
if [ -z "$DATABASE_TYPE" ]; then
  echo "Please set the DATABASE_TYPE environment variable to either 'postgres' or 'mysql'."
  exit 1
fi

case "$DATABASE_TYPE" in
  postgres)
    psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
      SELECT 'CREATE DATABASE journey_postgres_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'journey_postgres_db') \gexec
EOSQL
    ;;
  mysql)
    mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e \
      "CREATE DATABASE IF NOT EXISTS journey_admin_service; CREATE DATABASE IF NOT EXISTS journey_merchant_service;"
    ;;
  *)
    echo "Invalid value for DATABASE_TYPE. Supported values: postgres, mysql"
    exit 1
    ;;
esac