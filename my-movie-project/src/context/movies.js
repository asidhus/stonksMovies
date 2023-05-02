"use client"

import { createContext, useState, useRef, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

const MovieContext = createContext();



const fetchBookMarks = async (setBookMarkedMovies) =>{
  const url = `${process.env.BASE_URL}/api/bookmark`;
  let response;
  try{
    response = await fetch(url);
  }catch(err){
     return;
  }


  if(!response.ok) {
    throw new Error('Failed to fetch movies')
  }
  let bookmarks = await response.json();
  setBookMarkedMovies(bookmarks);
}


function MovieProvider({ children }) {

  
  const [bookMarkedMovies, setBookMarkedMovies] = useState({});

  const prevBookMarkedMoviesData = useRef([]);

  useEffect(() => {
    fetchBookMarks(setBookMarkedMovies)
  }, []);


  const removeBookMarkedMovie = (id) => {
    const current = {... bookMarkedMovies};
    delete current[id];
    setBookMarkedMovies(current);
  }

  const addBookMarkedMovie = (id) => {
    const current = {... bookMarkedMovies};
    current[id] = true;
    setBookMarkedMovies(current);
  }


  const valueToShare = {
    bookMarkedMovies,
    addBookMarkedMovie,
    removeBookMarkedMovie,
    prevBookMarkedMoviesData,
  };


  return (
    <MovieContext.Provider value={valueToShare}>
      {children}
    </MovieContext.Provider>
  );
}

export { MovieProvider };
export default MovieContext;
