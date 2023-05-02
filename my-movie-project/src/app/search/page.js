'use client'

import { Grid, GridItem } from '@chakra-ui/react';
import MovieCard from './movieCard';
import useSWR from 'swr';



const fetchMovies = async (url) =>{
  const response = await fetch(url);

  if(!response.ok) {
    throw new Error('Failed to fetch movies')
  }
  return response.json();
}





export default function Search({searchParams}) {

  const url =  searchParams.search ?  `https://api.themoviedb.org/3/search/movie?api_key=6078c11be20cef3e91e13be184fde51b&language=en-US&query=${searchParams.search}&page=1` : `https://api.themoviedb.org/3/movie/popular?api_key=6078c11be20cef3e91e13be184fde51b`;


  const { data, isLoading } = useSWR(url, fetchMovies);

  if(!data?.results){
    return null;
  }

  const generateMovies = () => {
    return data.results.map((movie) => {
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
