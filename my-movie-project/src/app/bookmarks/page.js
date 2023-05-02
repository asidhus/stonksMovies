'use client'
import { useContext, useEffect } from "react";
import MovieContext from "@/context/movies";

import { Grid, GridItem } from '@chakra-ui/react';
import MovieCard from './movieCard';
import useSWR from 'swr';


const fetchMovies = async (urls) =>{
  const f = url => fetch(url).then(r => r.json())
  return Promise.all(urls.map(url => f(url)))
}

export default function BookMarks() {

  const { bookMarkedMovies, prevBookMarkedMoviesData } = useContext(MovieContext);
  let urls = Object.keys(bookMarkedMovies).map( movieId => {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=6078c11be20cef3e91e13be184fde51b&language=en-US`;
  });

  const { data, isLoading } = useSWR(urls, fetchMovies);

  useEffect(() => {
    if (!isLoading && data) {
      prevBookMarkedMoviesData.current = data;
    }
  }, [isLoading]);

  let bookMarkedData = data || prevBookMarkedMoviesData.current;

  
  const generateMovies = () => {
    return bookMarkedData.map((movie) => {
      return (
        <GridItem key={movie.id}>
          <MovieCard 
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
          />
        </GridItem>
      );
    });
  }

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={5}>
      {generateMovies()}
    </Grid>
  )
}
