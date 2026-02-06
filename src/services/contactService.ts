import axios from 'axios';
import { API_BASE_URL } from '../config/api';

interface ContactFormData {
    name: string;
    phone: string;
    email: string;
    message: string;
}

interface ContactResponse {
    message: string;
}

/**
 * Sends contact form data to the backend API.
 * @param data - The form data containing name, phone, email, and message.
 * @returns A promise that resolves to the success message from the API.
 */
export const sendContactMessage = async (data: ContactFormData): Promise<string> => {
    try {
        const response = await axios.post<ContactResponse>(`${API_BASE_URL}/api/v1/contact`, data);
        return response.data.message || 'Message sent successfully!';
    } catch (error: any) {
        // Extract and re-throw a user-friendly error message
        let errorMessage = 'Something went wrong. Please try again.';

        if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};
