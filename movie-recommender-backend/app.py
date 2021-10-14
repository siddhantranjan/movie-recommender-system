from flask import Flask, request
from flask_cors import CORS

from fetchData import *

app = Flask(__name__)
CORS(app)

@app.route('/movie/<movieId>')
def login(movieId):
  return response(movieId)

def response(movieId):
  movieList = getMovieList(movieId)
  res = {
    "success": True,
    "movieList": movieList
  }
  return res

if __name__ == '__main__':
    app.run(debug=True)