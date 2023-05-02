"use-client";
import { useContext } from "react";
import MovieContext from "@/context/movies";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
  Flex,
} from "@chakra-ui/react";


import { Icon } from "@chakra-ui/react";
import { BsBookmarkPlusFill, BsBookmarkPlus } from "react-icons/bs";


const deleteBookMarks = async (removeBookMarkedMovie, id) =>{
  const url = `http://localhost:3000/api/bookmark?deleteId=${id}`;
  let response;
  try{
    response = await fetch(url, {
      method: 'DELETE',
    });
  }catch(err){
     console.log(err);
     console.log('I errored out while deleting\n\n\n\n')
     return;
  }
  if(!response.ok) {
    throw new Error('Failed to delete movie')
  }
  removeBookMarkedMovie(id);
}

const addBookMarks = async (addBookMarkedMovie, id) =>{
  const url = `http://localhost:3000/api/bookmark`;
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
     console.log(err);
     console.log('I errored out while deleting\n\n\n\n')
     return;
  }
  if(!response.ok) {
    throw new Error('Failed to delete movie')
  }
  addBookMarkedMovie(id);
}



const imagePath = "https://image.tmdb.org/t/p/original";

export default function MovieCard({ title, release_date, poster_path, id }) {
  const { bookMarkedMovies, removeBookMarkedMovie, addBookMarkedMovie } = useContext(MovieContext);
  return (
    <>
      <Center key={id} py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${imagePath + poster_path})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Link href={`/movie?id=${id}`}>
              <Image
                rounded={"lg"}
                objectFit={"cover"}
                src={imagePath + poster_path}
              />
            </Link>
            <Flex
            onClick = {bookMarkedMovies[id] ? () => deleteBookMarks(removeBookMarkedMovie,id) : () => addBookMarks(addBookMarkedMovie,id)}
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
            <Icon as={bookMarkedMovies[id] ? BsBookmarkPlusFill : BsBookmarkPlus} boxSize={8} />
          </Flex>
          </Box>
          <Stack pt={10} align={"center"}>
            <Link href={`/movie?id=${id}`}>
              <Heading fontSize={"xl"} fontFamily={"body"} fontWeight={800}>
                {title}
              </Heading>
              <Stack direction={"row"} align={"center"}>
                <Text fontWeight={500} fontSize={"l"}>
                  {release_date}
                </Text>
              </Stack>
            </Link>
          </Stack>
        </Box>
      </Center>
    </>
  );
}
