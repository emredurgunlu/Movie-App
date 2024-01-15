import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // ilk açılışta 
    getMovies(FEATURED_API);
  }, []);

  // getMovies fonksyonunu dinamik(parametrik) yaptık. ilk açılışta FEATURED_API den yani tüm movilerin verisini çekiyor. Search tıklanıldığında ise
  // serchlü apiden verileri çekiyor
  const getMovies = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <MovieContext.Provider value={{ movies, loading, getMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
