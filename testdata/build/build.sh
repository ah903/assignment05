!#/bin/bash

# Script Variable Declarations
# $host = 127.0.0.1
# $port = 27017
# $db = attire-db0-dev
# $products = products
# $reviews = reviews

# Change Working Directory From Root
cd "/Users/Andrew/Desktop/Masters/Module 5/Assignment/attire/testdata/generated"

# Clean Up Any Old Files
rm products.json
rm reviews.json

# Concatenate Product Data Files
cat product-data-*.json > products.json

# Correction Script Replaces oid with $oid for managing ObjectIds in Mongo
# JSON generator tool does not support this by default
sed -i -e "s/oid/$oid/g" products_out.json

# Concatenate Review Data Files
cat review-data-*.json > reviews.json

# Correction Script Replaces oid with $oid for managing ObjectIds in Mongo
# JSON generator tool does not support this by default
sed -i -e "s/oid/$oid/g" reviews_out.json

# Import Products and Reviews Into Mongo Instance Dropping All Existing Data First
#mongoimport --host $host --port $port --db $db --collection $products --drop --file products.json
#mongoimport --host $host --port $port --db $db --collection $reviews --drop --file reviews.json

