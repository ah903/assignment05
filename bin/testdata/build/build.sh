#!/bin/bash
# Script Variable Declarations
#host = "127.0.0.1"
#port = "27017"
#db = "attire-db0-dev"
#products = "products"
#reviews = "reviews"

# Change Working Directory From Root
cd "../generation-02"

# Clean Up Any Old Files
rm product-100-out.json
rm product-200-out.json
rm product-300-out.json
rm product-400-out.json

rm review-100-out.json
rm review-200-out.json
rm review-300-out.json
rm review-400-out.json
rm review-500-out.json
rm review-600-out.json
rm review-700-out.json
rm review-800-out.json

# Concatenate Product Data Files
# cat product-data-*.json > products.json
#cat product-data-100.json sep.txt product-data-200.json sep.txt product-data-300.json sep.txt product-data-400.json > products.json

# Correction Script Replaces oid with $oid for managing ObjectIds in Mongo
# JSON generator tool does not support this by default
sed 's/"oid":/"$oid":/g' < product-data-100.json > product-100-out.json
sed 's/"oid":/"$oid":/g' < product-data-200.json > product-200-out.json
sed 's/"oid":/"$oid":/g' < product-data-300.json > product-300-out.json
sed 's/"oid":/"$oid":/g' < product-data-400.json > product-400-out.json


# Concatenate Review Data Files
# cat review-data-*.json > reviews.json


# Correction Script Replaces oid with $oid for managing ObjectIds in Mongo
# JSON generator tool does not support this by default
sed 's/"oid":/"$oid":/g' < review-data-100.json > review-100-out.json
sed 's/"oid":/"$oid":/g' < review-data-200.json > review-200-out.json
sed 's/"oid":/"$oid":/g' < review-data-300.json > review-300-out.json
sed 's/"oid":/"$oid":/g' < review-data-400.json > review-400-out.json
sed 's/"oid":/"$oid":/g' < review-data-500.json > review-500-out.json
sed 's/"oid":/"$oid":/g' < review-data-600.json > review-600-out.json
sed 's/"oid":/"$oid":/g' < review-data-700.json > review-700-out.json
sed 's/"oid":/"$oid":/g' < review-data-800.json > review-800-out.json


# Import Products and Reviews Into Mongo Instance Dropping All Existing Data First
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection products --drop --file product-100-out.json --jsonArray
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection products --file product-200-out.json --jsonArray
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection products --file product-300-out.json --jsonArray
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection products --file product-400-out.json --jsonArray

mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --drop --file review-100-out.json --jsonArray
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-200-out.json --jsonArray
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-300-out.json --jsonArray
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-400-out.json --jsonArray
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-500-out.json --jsonArray
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-600-out.json --jsonArray
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-700-out.json --jsonArray
mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection reviews --file review-800-out.json --jsonArray

mongoimport --host 127.0.0.1 --port 27017 --db attire-db0-dev --collection customers --drop --file customer-100-out.json --jsonArray
