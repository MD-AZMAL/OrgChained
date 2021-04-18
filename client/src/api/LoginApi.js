import axios from 'axios';
import endpoints  from '../api/routes';

export const loginApi = async (email, role, password) => {
    const login = endpoints.login;
    let data;
    let error;

    const requrestObject = {
        method: login.method,
        url: login.url,
        data: {
            email,
            password,
            role
        }
    };

    try {
        const result = await axios(requrestObject);
        data = result.data;

        error = null;
    } catch (err) {
        data = null;
        error = err;
    }


    return [error, data];
};