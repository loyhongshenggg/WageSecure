import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, HStack } from '@chakra-ui/react';
import { getAuth } from '../api/auth'; 
import { useNavigate } from 'react-router-dom';

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
    try {
      const response = await getAuth('signup', formData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <Box w="550px" p={4} m="20px auto">
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">Sign Up</Heading>
        <FormControl id="userType">
          <FormLabel>User Type</FormLabel>
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
          <FormLabel>{formData.userType === '0' ? 'First Name' : 'Company Name'}</FormLabel>
          <Input
            type="text"
            name="firstName"
            onChange={handleChange}
          />
        </FormControl>
        {formData.userType === '0' && (
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="lastName" onChange={handleChange} />
          </FormControl>
        )}
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" onChange={handleChange} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" onChange={handleChange} />
        </FormControl>
        <FormControl id="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" name="confirmPassword" onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>Sign Up</Button>
      </VStack>
    </Box>
  );
};

export default Signup;
