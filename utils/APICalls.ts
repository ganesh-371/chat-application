
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
    });
    return response.data;
};

export const register = async (email: string, password: string,  full_name: string, domain: string) => {
    const response = await axios.post(`${apiBaseUrl}/register`, {
        email: email,
        password: password,
        // username: username,
        full_name: full_name,
        domain: domain,
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

export const uploadFiles = async (user_id: string,formData: FormData) => {
    const response = await axios.post(`${apiBaseUrl}/upload/${user_id}`
        , formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const otpVerify=async(user_id:string,otp:any)=>{
    const response=await axios.post(`${apiBaseUrl}/verify_otp`,{
        headers:{
            
        }
    });
};