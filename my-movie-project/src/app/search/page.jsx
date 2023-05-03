'use client';

import { Grid, GridItem } from '@chakra-ui/react';
import { React } from 'react';
import useSWR from 'swr';
import MovieCard from '../components/movieCard';


const fetchMovies = async (url) => {
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    return null;
  }


  const result = response.json();
  return result;
};


export default function Search({ searchParams }) {
  const { search } = searchParams;
  let url;
  if (search) {
    url = `/api/search?search=${search}`;
  } else {
    url = '/api/search';
  }

  const { data } = useSWR(url, fetchMovies);

  if (!data?.results) {
    return null;
  }

  const generateMovies = () => data.results.map(movie => (
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
