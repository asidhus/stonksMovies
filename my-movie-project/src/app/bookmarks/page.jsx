'use client';

import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import { Grid, GridItem } from '@chakra-ui/react';

import MovieContext from '../context/movies';
import MovieCard from '../components/movieCard';


const fetchMovies = async (urls) => {
  const f = url => fetch(url).then(r => r.json());
  return Promise.all(urls.map(url => f(url)));
};

export default function BookMarks() {
  const { bookMarkedMovies, prevBookMarkedMoviesData } = useContext(MovieContext);
  const urls = Object.keys(bookMarkedMovies).map(movieId => `/api/movieInfo?movieId=${movieId}`);

  const { data, isLoading } = useSWR(urls, fetchMovies);

  useEffect(() => {
    if (!isLoading && data) {
      prevBookMarkedMoviesData.current = data;
    }
  }, [isLoading]);

  const bookMarkedData = data || prevBookMarkedMoviesData.current;


  const generateMovies = () => bookMarkedData.map(movie => (
    <GridItem key={movie.id}>
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        posterPath={movie.poster_path}
        releaseDate={movie.release_date}
      />
    </GridItem>
  ));

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={5}>
      {generateMovies()}
    </Grid>
  );
}
