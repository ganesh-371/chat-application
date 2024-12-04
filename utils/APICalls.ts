
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

export const logout=async(domain:string)=>{
    const response=await axios.post(`${apiBaseUrl}/logout`,{
        domain:domain,
        headers:{
            'Content-Type': 'application/json',
        },
    });
    return response.data
}

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

export const resetPassword = async (token: string, new_password: string,domain:string) => {
    try {
        const response = await axios.post(
            `https://chatbot.brainwave-labs.com/chat_bot/reset_password?token=${token}`,
            {
                new_password: new_password,
                domain: domain
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Response Error:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to reset password');
        } else if (error.request) {
            console.error('Request Error:', error.request);
            throw new Error('No response received from server');
        } else {
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