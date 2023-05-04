'use client';

import { useContext } from 'react';
import useSWR from 'swr';
import { Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  SimpleGrid,
  ListItem,
  List,
  Icon } from '@chakra-ui/react';
import { BsBookmarkPlusFill, BsBookmarkPlus } from 'react-icons/bs';
import MovieContext from '../context/movies';


import { deleteBookMarks, addBookMarks } from '../components/addRemoveBookMarks';


const fetchMovie = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
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
  const imagePath = 'https://image.tmdb.org/t/p/original';

  return (
    <Container maxW="10xl">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex direction="column" position="relative">
          <Image
            fallbackSrc="/Image_Coming_Soon.png"
            rounded="lg"
            objectFit="contain"
            src={imagePath + data.poster_path}
          />
          <Flex
            onClick={
              bookMarkedMovies[data.id]
              ? () => deleteBookMarks(removeBookMarkedMovie, data.id)
              : () => addBookMarks(addBookMarkedMovie, data.id)}
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
              bg: 'rgba(0, 0, 0, 0.7)', // Adjust the opacity as needed
            }}
          >
            <Icon
              as={
              bookMarkedMovies[data.id]
              ? BsBookmarkPlusFill
              : BsBookmarkPlus}
              boxSize={8}
            />
          </Flex>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as="header">
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {data.original_title}
            </Heading>
            <Text fontWeight={300} fontSize="xl">
              {data.overview}
            </Text>
          </Box>
          <Box>
            <Text
              fontSize={{ base: '18px', lg: '20px' }}
              color="black"
              fontWeight="bold"
              textTransform="uppercase"
              mb="4"
            >
              Movie Details
            </Text>

            <List spacing={2}>
              <ListItem>
                <Text as="span" fontWeight="500">
                  Movie Budget:
                </Text>{' '}
                {data.budget ? `${data.budget}$` : 'Unknown'}
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="500">
                  Genres:
                </Text>{' '}
                {data.genres.length > 0 ? data.genres.map(x => `${x.name} `) : 'No generes listed' }
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="500">
                  Release Date:
                </Text>{' '}
                {data.release_date}
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="500">
                  Status
                </Text>{' '}
                {data.status || 'Unkown'}
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="500">
                  Popularity:
                </Text>{' '}
                {data.popularity || 'Unkown'}
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="500">
                  Revneue:
                </Text>{' '}
                {data.revenue ? `${data.revenue}$` : 'Unknown'}
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="500">
                  IMBD ID:
                </Text>{' '}
                {data.imdb_id || 'Unknown'}
              </ListItem>
            </List>
          </Box>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
