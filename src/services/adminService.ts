import axios from 'axios';
import { API_BASE_URL } from '../config/api';

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

interface Meta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface AdminContactsResponse {
    data: Contact[];
    meta: Meta;
}

const ADMIN_KEY_STORAGE = 'portfolio_admin_key';

/**
 * Gets the admin key from session storage.
 */
export const getAdminKey = (): string | null => {
    return sessionStorage.getItem(ADMIN_KEY_STORAGE);
};

/**
 * Sets the admin key in session storage.
 */
export const setAdminKey = (key: string): void => {
    sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
};

/**
 * Clears the admin key from session storage (Logout).
 */
export const clearAdminKey = (): void => {
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
};

/**
 * Fetches contacts from the admin API.
 * Handles auto-logout on 401/403.
 */
export const getAdminContacts = async (page: number = 1, limit: number = 10): Promise<AdminContactsResponse> => {
    const key = getAdminKey();

    if (!key) {
        throw new Error('Admin authentication required');
    }

    try {
        const response = await axios.get<AdminContactsResponse>(`${API_BASE_URL}/api/v1/admin/contacts`, {
            params: { page, limit },
            headers: {
                'x-admin-key': key
            }
        });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            // Only Logout on strictly 401/403
            if (status === 401 || status === 403) {
                clearAdminKey();
                // Throw specific error that Admin.tsx listens for
                throw new Error('Session expired or invalid key');
            }
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
        }
        throw new Error('Failed to fetch contacts');
    }
};

export interface AdminSummaryData {
    total: number;
    last7Days: number;
    last30Days: number;
    latestActivity: string | null;
}

export interface AdminSummaryResponse {
    data: AdminSummaryData;
}

/**
 * Fetches admin summary statistics.
 */
export const getAdminSummary = async (): Promise<AdminSummaryResponse> => {
    const key = getAdminKey();

    if (!key) {
        throw new Error('Admin authentication required');
    }

    try {
        const response = await axios.get<AdminSummaryResponse>(`${API_BASE_URL}/api/v1/admin/summary`, {
            headers: {
                'x-admin-key': key
            }
        });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                clearAdminKey();
                throw new Error('Session expired or invalid key');
            }
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
        }
        throw new Error('Failed to fetch summary');
    }
};

/**
 * Triggers CSV export of contacts.
 */
export const exportContactsCSV = async (): Promise<void> => {
    const key = getAdminKey();

    if (!key) {
        throw new Error('Admin authentication required');
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/admin/contacts/export`, {
            headers: {
                'x-admin-key': key
            },
            responseType: 'blob' // Important for file download
        });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contacts_export.csv');
        document.body.appendChild(link);
        link.click();

        // Clean up
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                clearAdminKey();
                throw new Error('Session expired or invalid key');
            }
            if (error.response?.data?.message) {
                // Try to read blob as text to get error message
                // This is a bit complex with blobs, defaulting to generic error is safer for now
                throw new Error('Failed to export contacts');
            }
        }
        throw new Error('Failed to export CSV');
    }
};
