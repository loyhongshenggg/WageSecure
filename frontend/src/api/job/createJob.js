import { BASE_URL } from '../url';
import axios from 'axios';
// import Cookies from 'js-cookie'; 

export const createJob = async (formData) => {
    // const token = Cookies.get("token");
    try {
        const response = await axios.post(`${BASE_URL}/job/createJob`, JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        
        const data = response.data;
        
        if (response.status === 201) {
            return data;
        }
    } catch (error) {
        throw error;
    }
};
