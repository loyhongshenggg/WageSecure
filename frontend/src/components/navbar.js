import React from 'react';
import { Flex, Text, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.clear(); // Clearing all data in localStorage
        navigate('/login'); // Redirecting to login page after logout
      };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="teal.500" 
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          <Text fontWeight="bold" color="teal.500">WageSecure</Text> {/* Changed text color to teal */}
        </Heading>
      </Flex>
      <Button 
        colorScheme="teal" 
        variant="outline" 
        _hover={{ bg: "teal.500", color: "white", borderColor: "teal.500" }} // Added hover styles
        onClick={handleLogout}>
        Logout
        </Button>
    </Flex>
  );
};

export default Navbar;
