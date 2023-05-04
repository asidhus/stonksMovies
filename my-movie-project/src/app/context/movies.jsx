'use client';

import { createContext, useState, useRef, useEffect } from 'react';

const MovieContext = createContext();


const fetchBookMarks = async (setBookMarkedMovies) => {
  // const url = '/api/bookmark';
  // let response;
  // try {
  //   response = await fetch(url);
  // } catch (err) {
  //   return;
  // }


  // if (!response.ok) {
  //   throw new Error('Failed to fetch movies');
  // }
  // const bookmarks = await response.json();
  let bookmarks = localStorage.getItem('bookmarks');
  if (!bookmarks) {
    bookmarks = {};
    setBookMarkedMovies(bookmarks);
  } else {
    setBookMarkedMovies(JSON.parse(bookmarks));
  }
};


function MovieProvider({ children }) {
  const [bookMarkedMovies, setBookMarkedMovies] = useState({});

  const prevBookMarkedMoviesData = useRef([]);

  useEffect(() => {
    fetchBookMarks(setBookMarkedMovies);
  }, []);


  const removeBookMarkedMovie = (id) => {
    const current = { ...bookMarkedMovies };
    delete current[id];
    if (Object.keys(current).length === 0) {
      prevBookMarkedMoviesData.current = [];
    }
    localStorage.setItem('bookmarks', JSON.stringify(current));
    setBookMarkedMovies(current);
  };

  const addBookMarkedMovie = (id) => {
    const current = { ...bookMarkedMovies };
    current[id] = true;
    if (Object.keys(current).length === 0) {
      localStorage.setItem('bookmarks', null);
    } else {
      localStorage.setItem('bookmarks', JSON.stringify(current));
    }
    setBookMarkedMovies(current);
  };


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
