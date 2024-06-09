import React, { useState } from 'react';
import { Box, Button, FormControl, Input, VStack, Heading, HStack, Text, Image, Divider, Link } from '@chakra-ui/react';
import { getSignupAuth } from '../api/auth/signupAuth'; 
import { useNavigate } from 'react-router-dom';
import AuthImage from '../images/authImage.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (userType) => {
    setFormData({ ...formData, userType, lastName: '' }); // Reset last name for agency or company
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    getSignupAuth(formData)
    .then((response) => {
      console.log(response.data);
      navigate('/login');
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
          <Heading as="h1" size="lg" padding="lg" textAlign="center" pb={4}>
            Join <Text as="span" color="teal.500">WageSecure</Text> Today!
          </Heading>
          <Divider />
          <FormControl id="userType" pt={4}>
            <HStack spacing={4}>
              <Button size='md' colorScheme={formData.userType === '0' ? 'teal' : 'gray'} onClick={() => handleUserTypeChange('0')}>
                Employee
              </Button>
              <Button size='md' colorScheme={formData.userType === '1' ? 'teal' : 'gray'} onClick={() => handleUserTypeChange('1')}>
                Recruitment Agency
              </Button>
              <Button size='md' colorScheme={formData.userType === '2' ? 'teal' : 'gray'} onClick={() => handleUserTypeChange('2')}>
                Employment Company
              </Button>
            </HStack>
          </FormControl>
          <FormControl id="firstName">
            <Input
              type="text"
              name="firstName"
              placeholder={formData.userType === '0' ? 'First Name' : 'Company Name'}
              onChange={handleChange}
            />
          </FormControl>
          {formData.userType === '0' && (
            <FormControl id="lastName">
              <Input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
            </FormControl>
          )}
          <FormControl id="email">
            <Input type="email" name="email" placeholder='Email Address' onChange={handleChange} />
          </FormControl>
          <FormControl id="password">
            <Input type="password" name="password" placeholder='Password' onChange={handleChange} />
          </FormControl>
          <FormControl id="confirmPassword">
            <Input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={handleChange} />
          </FormControl>
          <Button colorScheme="teal" onClick={handleSubmit}>Sign Up</Button>
          <Link color="teal.500" onClick={() => navigate('/login')}>Already have an account? Login</Link>
        </VStack>
        </Box>
      </Box>
    </HStack>
  );
};

export default Signup;
