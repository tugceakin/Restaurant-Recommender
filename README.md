# Restaurant-Recommender

A recommendation engine built using item-based collaborative filtering algorithm. Datasets are provided by [Yelp](https://www.yelp.com/dataset_challenge).

## Prerequisities
- Node.js
- NPM 
- Python 
- Flask
- SciPy
- PyMongo

## Installation

Create a databse called recommender in mongodb.
`use recommender`

Download [collections](https://www.dropbox.com/sh/w0ot5q9640xw374/AADG6qHgqGjNt09YUshu2IWfa?dl=0)

Import collections.
`mongoimport --db recommender --collection JSON_FILE_NAME --file`

Go to UI folder and install dependencies.

`npm install`

## Usage

Go the API folder and start the app.py file.

`python app.py`

This will start the Python server which serves as the backend and will provide the recommendations

Next go the UI folder and start the node server

`node app.js`

Now the application can be accessed at localhost:3000.


