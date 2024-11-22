
import axios from "axios";
import { headers } from "next/headers";

const apiBaseUrl = "https://chatbot.brainwave-labs.com/chat_bot";

export const getUser = async (token: string) => {
    const response = await axios.get(`${apiBaseUrl}/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const login = async (domain: string, password: string) => {
    const response = await axios.post(`${apiBaseUrl}/login`, {
        domain: domain,
        password_hash: password,
        headers: {
            'Content-Type': 'multipart/form-data',
            'access-control-origin':'*',
            'access-control-allow-origin':'*',
        },
    });
    return response.data;
};

export const forgotPassword= async(email:string,domain:string)=>{
    const response=await axios.post(`${apiBaseUrl}/forgot_password`,{
        email:email,
        domain:domain,
        headers:{
            'Content-Type':'multipart/form-data',
            'access-control-origin':'*',
            'acces-control-allow-origin':'*'
        }
    });
    return response.data
}

export const register = async (email: string, password: string,  full_name: string, domain: string) => {
    const response = await axios.post(`${apiBaseUrl}/register`, {
        email: email,
        password: password,
        // username: username,
        full_name: full_name,
        domain: domain,
        headers: {
            'Content-Type': 'multipart/form-data',
            'access-control-origin':'*',
            'access-control-allow-origin':'*',
        },
        
    });
    return response.data;
};

export const verify = async (token: string) => {
    const response = await axios.post(`${apiBaseUrl}/api/v1/verify-email?token=${token}`, {}, {
        headers: {
            // Authorization: `Bearer ${token}`,  
        },
    });

    return response.data;
};

export const resetPassword = async (token: string, new_password: string) => {
    console.log(token);
    try {
        const response = await axios.post(
            `${apiBaseUrl}/reset_password`, // Remove token from URL
            {
                token: token,                    // Add token in request body
                new_password: new_password,
                domain: "www.thaman.com"         // Add domain in request body
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
        return response.data;
    } catch (error: any) {
        // Better error handling
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response Error:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to reset password');
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request Error:', error.request);
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
            throw new Error('Error setting up the request');
        }
    }
};

export const uploadFiles = async (formData: FormData) => {
    const website = localStorage.getItem('domain') || ''; // www.abcd.com
    const domainName = website.split('.')[1]; // Get 'abcd' from www.abcd.com
    const response = await axios.post(`${apiBaseUrl}/new_upload?domain_name=${domainName}`
        , formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'access-control-origin':'*',
            'access-control-allow-origin':'*',
        },
    });

    return response.data;
};

export const verifyOTP=async(input_otp:string)=>{
    try{
        const response=await axios.post(`${apiBaseUrl}/verify_otp`,{input_otp},{
            headers:{
                "content-type":"application/json",
            }
        });
        return response.data
    }catch(error){
        console.error("error while entering otp verification",error)

    }
};