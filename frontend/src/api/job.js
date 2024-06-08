import { BASE_URL } from './url';
import axios from 'axios';
import Cookies from 'js-cookie'; // Make sure to install and import js-cookie

export const getAuth = async () => {
    // const token = Cookies.get("token");
    try {
        const response = await axios.post(`${baseURL}/job`, {
            // token: token
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = response.data;
        console.log(data);
        
        if (response.status === 200) {
            return data;
        }
    } catch (error) {
        throw error;
    }
};
