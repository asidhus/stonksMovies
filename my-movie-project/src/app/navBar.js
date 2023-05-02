'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  InputGroup,
  InputRightAddon,
  Input,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';

import { Link } from '@chakra-ui/next-js';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = [
    {
        desc: 'Search',
        addr: '/search'
    }, 
    {
        desc: 'Bookmarks',
        addr: '/bookmarks'
    }
];


const NavLink = ({ children, adress }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={adress}>
    {children}
  </Link>
);

function generateNavLinks () {
    return Links.map((link) => (

        <NavLink key={link.desc} adress = {link.addr}>{link.desc}</NavLink>
      ));
}

export default function NavBar() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  let handleSearchChange = e => {
    setSearchValue(e.target.value) 
};

  let handleSearchSubmit = e => {
    e.preventDefault();
    const value = searchValue;
    router.push(`./search?search=${value}`);
    setSearchValue('');
  };

  return (
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {generateNavLinks()}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <form onSubmit={handleSearchSubmit}>
                <InputGroup> 
                        <Input
                            value={searchValue}
                            placeholder='Search Movie Name'
                            onChange={handleSearchChange}
                        />
                        <InputRightAddon>
                        <Button onClick={handleSearchSubmit}>Search</Button>
                        </InputRightAddon>
                </InputGroup>
            </form>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {generateNavLinks()}
            </Stack>
          </Box>
        ) : null}
      </Box>
  );
}