!#/bin/bash

cd "/Users/Andrew/Desktop/Masters/Module 5/Assignment/Models/testdata"

# Script Variables
host = 127.0.0.1
port = 27017
db = attire-db0-dev
products = products
reviews = reviews

# Import Product catalog test data
# Drop Products collection if already exists
mongoimport --host $host --port $port --db $db --collection $products --drop --file product-data-100.json --jsonArray
mongoimport --host $host --port $port --db $db --collection $products --file product-data-200.json --jsonArray
mongoimport --host $host --port $port --db $db --collection $products --file product-data-300.json --jsonArray
mongoimport --host $host --port $port --db $db --collection $products --file product-data-400.json --jsonArray

# Import Product Reviews test data
# Drop Reviews collection if already exists
mongoimport --host $host --port $port --db $db --collection $reviews --drop --file review-data-100.json --jsonArray
mongoimport --host $host --port $port --db $db --collection $reviews --drop --file review-data-200.json --jsonArray
mongoimport --host $host --port $port --db $db --collection $reviews --drop --file review-data-300.json --jsonArray
mongoimport --host $host --port $port --db $db --collection $reviews --drop --file review-data-400.json --jsonArray
mongoimport --host $host --port $port --db $db --collection $reviews --drop --file review-data-500.json --jsonArray
mongoimport --host $host --port $port --db $db --collection $reviews --drop --file review-data-600.json --jsonArray
mongoimport --host $host --port $port --db $db --collection $reviews --drop --file review-data-700.json --jsonArray
mongoimport --host $host --port $port --db $db --collection $reviews --drop --file review-data-800.json --jsonArray


# Import Product catalog test data
# Drop Products collection if already exists
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection products --drop --file product-data-100.json --jsonArray
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection products --file product-data-200.json --jsonArray
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection products --file product-data-300.json --jsonArray
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection products --file product-data-400.json --jsonArray

# Import Product Reviews test data
# Drop Reviews collection if already exists
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --drop --file review-data-100.json --jsonArray
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-data-200.json --jsonArray
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-data-300.json --jsonArray
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-data-400.json --jsonArray
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-data-500.json --jsonArray
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-data-600.json --jsonArray
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-data-700.json --jsonArray
# mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-data-800.json --jsonArray

mongoexport -h 127.0.0.1 -d attire-db0-dev -c products -o export-products.json
mongoexport -h 127.0.0.1 -d attire-db0-dev -c reviews -o export-reviews.json

sed -i -e "s/oid/$oid/g" export-products.json
sed -i -e "s/oid/$oid/g" export-reviews.json
