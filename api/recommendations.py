#modules
import re
import random
import numpy as np
from collections import defaultdict
from scipy.stats.stats import pearsonr
from math import sqrt
import time
import json
from scipy import spatial
import time
import pymongo 
from bson import BSON
from bson import json_util
from database import Database


d = Database()
connection = d.getConnection()
db = connection.recommender 


class Recommendation(object):

    def __init__(self):
        self.user_dict = {}
        self.business_dict = {}
        self.itemsim = {} #Similarity matrix
        self.businesses = {} 
        self.topRestaurants = {}

    #Top rated businesses to be recommended when there is no record
    def getTopRestaurants(self):
        for i in self.business_dict:
            rates = self.business_dict[i].values()
            mean=np.mean(rates)
            if mean ==5:
                self.topRestaurants[i]=len(rates)
        topRestaurants = [(score,item) for item,score in self.topRestaurants.items()]
        topRestaurants.sort()
        topRestaurants.reverse()
        topRestaurants = [(5.0,j) for i,j in topRestaurants[:5]]
        return topRestaurants

    def prepareDatasets(self):
        for user in db.user_ratings.find():
        	user.pop("_id", None) 
        	self.user_dict.update(user)

        for business in db.business_ratings.find():
        	business.pop("_id", None) 
        	self.business_dict.update(business)

        for item in db.similarity_matrix.find():
        	item.pop("_id", None) 
        	self.itemsim.update(item)

        for business in db.businesses.find():
            b_id = business["business_id"]
            self.businesses[b_id] = business



    def getRecommendedItems(self, user):
        self.prepareDatasets()
        itemMatch = self.itemsim
        prefs = self.user_dict
        userRatings=prefs[user]
        scores={}
        totalSim={}
        # Loop over items rated by this user
        for (item,rating) in userRatings.items():
                 # Loop over items similar to this one
                 for arr in itemMatch[item]:
                        # Ignore if this user has already rated this item
                        similarity = arr[0] 
                        item2 = arr[1] 
                        if item2 in userRatings: continue
                        # Weighted sum of rating times similarity
                        scores.setdefault(item2,0)
                        scores[item2]+=similarity*rating
                        # Sum of all the similarities
                        totalSim.setdefault(item2,0)
                        totalSim[item2]+=similarity

        # Divide each total score by total weighting to get an average 
        rankings=[(score/totalSim[item],item) for item,score in scores.items() if score>0]
        
        # Return the rankings from highest to lowest 
        rankings.sort( )
        rankings.reverse( )
        print(len(rankings))
        if rankings:
            return  [(i,self.businesses[j]) for i,j in rankings[:20]]
        else:
            topRestaurants = self.getTopRestaurants()
            return  [(i,self.businesses[j]) for i,j in topRestaurants]


    def getRecommendations(self, user_id):
        recItems = self.getRecommendedItems(user_id) #random.sample(user_dict.keys(),1)[0]
        return recItems