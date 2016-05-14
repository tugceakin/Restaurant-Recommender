from pymongo import MongoClient

class Database(object):
    _db_connection = None

    def __init__(self):
        self._db_connection = MongoClient("mongodb://localhost:27017")

    def getConnection(self):
	    if not self._db_connection:
	        self._db_connection = MongoClient("mongodb://localhost:27017")
	    return self._db_connection
