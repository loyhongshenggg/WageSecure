// src/components/CompanyDashboard.js

import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Checkbox, Button, Box, Flex, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getAllJobsOfCompany } from '../api/job/getAllJobs';
import { markJobDone } from '../api/job/markJobDone';

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch jobs data from the API
    getAllJobsOfCompany(localStorage.getItem('id'))
      .then(response => {
        setJobs(response.data.job); // Assuming the response contains job data in an array
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []); // Empty dependency array to fetch data only once when component mounts

  const toggleCheckbox = (jobId) => {
    setSelectedJobs(prevSelected => {
      if (prevSelected.includes(jobId)) {
        return prevSelected.filter(id => id !== jobId);
      } else {
        return [...prevSelected, jobId];
      }
    });
  };

  const markJobAsComplete = async (jobId) => {
    try {
      await markJobDone(jobId);
      // If successful, update the jobs data to reflect the completion
      setJobs(prevJobs => prevJobs.map(job => job.id === jobId ? { ...job, isJobCompleted: true } : job));
    } catch (error) {
      console.error('Error completing job:', error.message);
    }
  };

  const handleSubmit = () => {
    // Process selectedJobs here, e.g., send to server
    selectedJobs.forEach(jobId => {
      markJobAsComplete(jobId);
    });
  };

  return (
    <Box p={4}>
      <Flex mb={4}>
        <Spacer />
        <Button colorScheme="teal" onClick={() => navigate('/createJob')}>Create Job</Button>
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Job ID</Th>
            <Th>Job Name</Th>
            <Th>Number of Employees</Th>
            <Th>Job Status</Th>
            <Th>Recruiter</Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobs.map(job => (
            <Tr key={job.id}>
              <Td>
                <Checkbox
                  isChecked={selectedJobs.includes(job.id)}
                  onChange={() => toggleCheckbox(job.id)}
                  isDisabled={job.isJobCompleted} // Disable checkbox if job status is done
                />
              </Td>
              <Td>{job.id}</Td>
              <Td>{job.jobName}</Td>
              <Td>{job.employeesId.length}</Td>
              <Td>{job.isJobCompleted ? 'Done' : 'In progress'}</Td>
              <Td>{job.recruiter ? 'Yes' : 'No'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        colorScheme="blue"
        mt={4}
        onClick={handleSubmit}
        isDisabled={selectedJobs.length === 0}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CompanyDashboard;
