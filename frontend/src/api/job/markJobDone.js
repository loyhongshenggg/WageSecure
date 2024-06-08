import { BASE_URL } from '../url';
import axios from 'axios';

export const markJobDone = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/job/completeJob`, JSON.stringify({jobId: id}), {
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