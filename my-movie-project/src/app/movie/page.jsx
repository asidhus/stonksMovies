"use client";
import { useContext } from 'react';
import MovieContext from '@/context/movies';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { BsBookmarkPlusFill, BsBookmarkPlus } from "react-icons/bs";

import useSWR from "swr";

const deleteBookMarks = async (removeBookMarkedMovie, id) =>{
  const url = `${process.env.BASE_URL}/api/bookmark?deleteId=${id}`;
  let response;
  try{
    response = await fetch(url, {
      method: 'DELETE',
    });
  }catch(err){
     return;
  }
  if(!response.ok) {
    throw new Error('Failed to delete movie')
  }
  removeBookMarkedMovie(id);
}

const addBookMarks = async (addBookMarkedMovie, id) =>{
  const url = `${process.env.BASE_URL}/api/bookmark`;
  let response;
  try{
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({addId: id}),
    });
  }catch(err){
     return;
  }
  if(!response.ok) {
    throw new Error('Failed to delete movie')
  }
  addBookMarkedMovie(id);
}

const fetchMovie = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};

export default function Movie({ searchParams }) {
  const { bookMarkedMovies, addBookMarkedMovie, removeBookMarkedMovie } = useContext(MovieContext);
  const url = `https://api.themoviedb.org/3/movie/${searchParams.id}?api_key=6078c11be20cef3e91e13be184fde51b&language=en-US`;

  const { data, isLoading } = useSWR(url, fetchMovie);

  if (isLoading) {
    return null;
  }

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <Container maxW={"10xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex direction="column" position="relative">
          <Image
            rounded="lg"
            objectFit="contain"
            src={imagePath + data.poster_path}
          />
          <Flex
            onClick = {bookMarkedMovies[data.id] ? () => deleteBookMarks(removeBookMarkedMovie,data.id) : () => addBookMarks(addBookMarkedMovie,data.id)}
            position="absolute"
            bottom={2}
            right={2}
            alignItems="center"
            justifyContent="center"
            bg="rgba(0, 0, 0, 0.5)" // Adjust the opacity as needed
            color="white"
            borderRadius="full"
            w={12}
            h={12}
            cursor="pointer"
            _hover={{
              bg: "rgba(0, 0, 0, 0.7)", // Adjust the opacity as needed
            }}
          >
            <Icon as={bookMarkedMovies[data.id] ? BsBookmarkPlusFill : BsBookmarkPlus} boxSize={8} />
          </Flex>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {data.original_title}
            </Heading>
            <Text fontWeight={300} fontSize={"xl"}>
              {data.overview}
            </Text>
          </Box>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
