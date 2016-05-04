import pymongo 
import json 
from pymongo import MongoClient

connection = MongoClient("mongodb://localhost:27017")

db = connection.recommender 
business_coll = db.businesses
review_coll = db.reviews
user_coll = db.users
user_ratings_coll = db.user_ratings
business_ratings_coll = db.business_ratings
matrix_coll = db.similarity_matrix

with open('yelp_academic_dataset_business.json', 'r') as f:
        for line in f:
        	business_coll.insert(json.loads(line))

with open('yelp_academic_dataset_user.json', 'r') as f:
        for line in f:
        	user_coll.insert(json.loads(line))

with open('yelp_academic_dataset_review.json', 'r') as f:
        for line in f:
	    	data = json.loads(line)
	    	#Remove text field from each review
	    	data.pop("text", None) 
	        review_coll.insert(data)

with open('itemsim2.json', 'r') as f:
        for line in f:
        	data = json.loads(line)
        	for business in data:
        		item = {}
        		item[str(business)] = data[str(business)]
        		matrix_coll.insert(item)

#Structure: user_dict[user][business]=rate
with open('user_dict.json', 'r') as f:
    for line in f:
        data = json.loads(line)
        for user in data:
        	item = {}
        	item[str(user)] = data[str(user)]
        	user_ratings_coll.insert({"_id": user, user: item[str(user)]})
    

#Structure: business_dict[business][user]=rating
with open('business_dict.json', 'r') as f:
    for line in f:
        data = json.loads(line)
        for business in data:
        	item = {}
        	item[str(business)] = data[str(business)]
        	business_ratings_coll.insert({"_id": business, business: item[str(business)]})

