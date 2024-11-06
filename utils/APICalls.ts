
import axios from "axios";

const apiBaseUrl = "https://chatbot.brainwave-labs.com/chat_bot";

export const getUser = async (token: string) => {
    const response = await axios.get(`${apiBaseUrl}/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${apiBaseUrl}/login`, {
        email: email,
        password_hash: password,
    });
    return response.data;
};

export const register = async (email: string, password: string, username: string, full_name: string, company_name: string) => {
    const response = await axios.post(`${apiBaseUrl}/register`, {
        email: email,
        password: password,
        username: username,
        full_name: full_name,
        company_name: company_name,
    });
    return response.data;
};

export const verify = async (token: string) => {
    const response = await axios.post(`${apiBaseUrl}/api/v1/verify-email/${token}`, {}, {
        headers: {
            // Authorization: `Bearer ${token}`,  
        },
    });

    return response.data;
};

export const uploadFiles = async (user_id: string, folderName: string,formData: FormData) => {
    const response = await axios.post("https://chatbot.brainwave-labs.com/chat_bot/upload/45?folder_name=ganesh"
        , formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};