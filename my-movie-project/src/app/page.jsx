'use client';

import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
} from '@chakra-ui/react';

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Container maxW="3xl">
        <Stack
          as={Box}
          textAlign="center"
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight="110%"
          >
            BookMark Your Favorite<br />
            <Text as="span" color="blue.400">
              Movies
            </Text>
          </Heading>
          <Text color="gray.500">
            Bookmark your favorite movies using this web app. You can search for movies
            bookmark them using the bookmark icon. You can remove bookmarks using the same icon.
            You can also click on each individual movie for more information on the movie itself.
            Get started by either searching for a movie or just clicking on the search tab
            which will display most popular movies as of now.
          </Text>
        </Stack>
      </Container>
    </>
  );
}

