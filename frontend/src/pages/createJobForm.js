import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api/job/createJob';

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    jobName: '',
    jobDescription: '',
    jobStartDate: '',
    jobEndDate: '',
    employeesId: [],
    employerId: localStorage.getItem('id') || '',
    recruiterId: null,
    ratePerHour: '',
    hoursPerDay: '',
    recruiterCommission: ''
  });
  const [employeeIdInput, setEmployeeIdInput] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmployeeId = () => {
    if (employeeIdInput.trim()) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        employeesId: [...prevFormData.employeesId, employeeIdInput.trim()]
      }));
      setEmployeeIdInput('');
    }
  };

  const handleRemoveEmployeeId = (id) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      employeesId: prevFormData.employeesId.filter((empId) => empId !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(formData);
    createJob(formData)
    .then((response) => {
      console.log(response.data);
      navigate('/companyDashboard');
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div style={{ backgroundColor: '#95baa9', minHeight: '100vh'}}>
      <Navbar />
      <Box p={20}>
        <form onSubmit={handleSubmit} style={{backgroundColor: 'white', padding: "20px"}}>
          <Heading as="h1" size="lg" mb={4} ml={8} mt={8}>Create Job</Heading>
          <VStack spacing={4} align="stretch">
            <Box bg="white" p={8}>
              <Heading as="h2" size="md" mb={2} color={'teal'}>Job Details</Heading>
              <FormControl id="jobName" isRequired>
                <FormLabel>Job Name</FormLabel>
                <Input type="text" name="jobName" value={formData.jobName} onChange={handleChange} />
              </FormControl>
              <FormControl id="jobDescription" isRequired>
                <FormLabel>Job Description</FormLabel>
                <Textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} />
              </FormControl>
              <FormControl id="jobStartDate" isRequired>
                <FormLabel>Job Start Date</FormLabel>
                <Input type="date" name="jobStartDate" value={formData.jobStartDate} onChange={handleChange} />
              </FormControl>
              <FormControl id="jobEndDate" isRequired>
                <FormLabel>Job End Date</FormLabel>
                <Input type="date" name="jobEndDate" value={formData.jobEndDate} onChange={handleChange} />
              </FormControl>
            </Box>
            <Box bg="white" p={10}>
              <Heading as="h2" size="md" mb={2} color={'teal'}>Employees</Heading>
              <FormControl id="employeesId">
                <FormLabel>Employees</FormLabel>
                <HStack>
                  <Input
                    type="text"
                    value={employeeIdInput}
                    onChange={(e) => setEmployeeIdInput(e.target.value)}
                    placeholder="Enter employee ID"
                  />
                  <Button onClick={handleAddEmployeeId}>Add</Button>
                </HStack>
                <Box mt={2}>
                  {formData.employeesId.map((id) => (
                    <Tag key={id} size="lg" colorScheme="teal" borderRadius="full" mt={1}>
                      <TagLabel>{id}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveEmployeeId(id)} />
                    </Tag>
                  ))}
                </Box>
              </FormControl>
            </Box>
            <Box bg="white" p={10}>
              <Heading as="h2" size="md" mb={2} color={'teal'}>Recruitment Details</Heading>
              <FormControl id="ratePerHour" isRequired>
                <FormLabel>Rate Per Hour</FormLabel>
                <Input type="number" name="ratePerHour" value={formData.ratePerHour} onChange={handleChange} />
              </FormControl>
              <FormControl id="hoursPerDay" isRequired>
                <FormLabel>Hours Per Day</FormLabel>
                <Input type="number" name="hoursPerDay" value={formData.hoursPerDay} onChange={handleChange} />
              </FormControl>
              <FormControl id="recruiterCommission" isRequired>
                <FormLabel>Recruiter Commission</FormLabel>
                <Input type="number" name="recruiterCommission" value={formData.recruiterCommission} onChange={handleChange} />
              </FormControl>
            </Box>
          </VStack>
          <HStack justifyContent="space-between" p={8}>
            <Button colorScheme="red" onClick={() => navigate('/companyDashboard')}>Cancel</Button>
            <Button colorScheme="teal" type="submit">Create Job</Button>
          </HStack>
        </form>
      </Box>
    </div>
  );
};

export default CreateJobForm;