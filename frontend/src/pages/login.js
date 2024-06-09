import React, { useState } from 'react';
import { Box, Button, FormControl, Input, VStack, Heading, Link, HStack, Text, Image, Divider } from '@chakra-ui/react';
import { getLoginAuth } from '../api/auth/loginAuth';
import { useNavigate } from 'react-router-dom';
import AuthImage from '../images/authImage.jpg';

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

    getLoginAuth(formData)
      .then((response) => {
        console.log(response);
        localStorage.setItem('id', response.id);
        localStorage.setItem('token', response.token);
        navigate('/companyDashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <HStack height="100vh" spacing={0}>
      <Box flex="1" display="flex" alignItems="center" justifyContent="center" p={10}>
        <Image 
            src={AuthImage}
            alt="Placeholder Image" 
            objectFit="cover" 
            width="100%" 
            height="90vh" 
            borderRadius="lg"
          />
      </Box>
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Box w="500px" p={4}>
          <VStack spacing={4} align="stretch">
            <Heading as="h1" size="lg" textAlign="center" pb={4}>
              Welcome to <Text as="span" color="teal.500">WageSecure</Text>
            </Heading>
            <Divider  />
            <FormControl id="email" pt={4}>
              <Input 
                type="email" 
                name="email" 
                placeholder="Email" 
                onChange={handleChange} 
              />
            </FormControl>
            <FormControl id="password">
              <Input 
                type="password" 
                name="password" 
                placeholder="Password" 
                onChange={handleChange} 
              />
            </FormControl>
            <Button colorScheme="teal" onClick={handleSubmit}>Login</Button>
            <Link color="teal.500" onClick={() => navigate('/signup')}>No Account? Signup Now!</Link>
          </VStack>
        </Box>
      </Box>
    </HStack>
  );
};

export default Login;
