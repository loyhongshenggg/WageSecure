import { BASE_URL } from '../url';
import axios from 'axios';

export const getAllJobsOfCompany = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/job/getAllJobsOfCompany`, JSON.stringify({id: id}), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching jobs:', error);
  }
};
