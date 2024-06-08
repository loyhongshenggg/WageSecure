import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading } from '@chakra-ui/react';
import { getAuth } from '../api/auth'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getAuth('login', formData);
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <Box w="400px" p={4} m="20px auto">
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">Login</Heading>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" onChange={handleChange} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>Login</Button>
      </VStack>
    </Box>
  );
};

export default Login;
