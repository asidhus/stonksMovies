'use-client';

import { useContext } from 'react';
import { Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
  Flex,
  Icon } from '@chakra-ui/react';
import { BsBookmarkPlusFill, BsBookmarkPlus } from 'react-icons/bs';

import MovieContext from '../context/movies';
import { deleteBookMarks, addBookMarks } from './addRemoveBookMarks';

const imagePath = 'https://image.tmdb.org/t/p/original';


export default function MovieCard({
  title, releaseDate, posterPath, id,
}) {
  const { bookMarkedMovies, removeBookMarkedMovie, addBookMarkedMovie } =
    useContext(MovieContext);

  return (
    <Center key={id} py={12}>
      <Box
        role="group"
        p={6}
        maxW="330px"
        h="550px"
        w="full"
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="2xl"
        rounded="lg"
        pos="relative"
        zIndex={1}
      >
        <Box
          rounded="lg"
          mt={-12}
          pos="relative"
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${imagePath + posterPath})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Link href={`/movie?id=${id}`}>
            <Image
              fallbackSrc="/Image_Coming_Soon.png"
              rounded="lg"
              objectFit="cover"
              src={imagePath + posterPath}
            />
          </Link>
          <Flex
            onClick={
              bookMarkedMovies[id]
                ? () => deleteBookMarks(removeBookMarkedMovie, id)
                : () => addBookMarks(addBookMarkedMovie, id)
            }
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
              as={bookMarkedMovies[id] ? BsBookmarkPlusFill : BsBookmarkPlus}
              boxSize={8}
            />
          </Flex>
        </Box>
        <Stack pt={10} align="center">
          <Link href={`/movie?id=${id}`}>
            <Heading fontSize="xl" fontFamily="body" fontWeight={800}>
              {title}
            </Heading>
            <Stack direction="row" align="center">
              <Text fontWeight={500} fontSize="l">
                {releaseDate}
              </Text>
            </Stack>
          </Link>
        </Stack>
      </Box>
    </Center>
  );
}
