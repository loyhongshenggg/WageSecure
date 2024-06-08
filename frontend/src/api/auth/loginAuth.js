import { BASE_URL } from '../url';
import axios from 'axios';
// import Cookies from 'js-cookie'; 

export const getLoginAuth = async (formData) => {
    // const token = Cookies.get("token");
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, JSON.stringify(formData), {
            // token: token
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = response.data;
        
        if (response.status === 200) {
            return data;
        }
    } catch (error) {
        throw error;
    }
};