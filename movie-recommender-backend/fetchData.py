import pickle
import requests
import json

movies = pickle.load(open('./models/movie_list.pkl','rb'))
similarity = pickle.load(open('./models/similarity.pkl','rb'))

def getMovieList(movieId):
    index = movies[movies['imdb_id'] == movieId].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_movie = []
    for i in distances[1:11]:
        recommended_movie.append(fetchData(movies.iloc[i[0]].imdb_id))

    return recommended_movie

def fetchData(movieId):
    url = "https://imdb-api.com/en/API/Title/k_5yvw75eh/{}/FullActor,Posters,".format(movieId)
    data = requests.get(url)
    data = data.json()
    #f = open('./singleMovies.json',)
    #data = json.load(f)
    res = {
        "id": data['id'],
        "image": data['image'],
        "title": data['fullTitle'],
        "imDbRating": data['imDbRating'],
        "year": data['year'],
        "director": data['directors'],
        "crew": data['stars']
    }
    return res