import axios from "axios";

const URL = 'https://www.google.com';

const axiosConfig = {
    url:URL,
    method: 'GET',
    timeout: 15000,
};

async function testProxy() {
    try {
        const response = axios(axiosConfig);
        if (await response){
            console.log('connection success');
            console.log('status code:', (await response).status)
        }
    } catch (error) {
        console.error('no https connnection', error)
    }
}

testProxy()