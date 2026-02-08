import React, { useState } from 'react';
import { setAdminKey } from '../services/adminService';
import Button from './Button';
import '../styles/components/AdminAuth.scss';

interface AdminAuthProps {
    onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
    const [key, setKey] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!key.trim()) {
            setError('Please enter the admin key');
            return;
        }
        setAdminKey(key);
        onAuthenticated();
    };

    return (
        <div className="admin-auth-container">
            <div className="admin-auth-card">
                <h2>Admin Access</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Enter Admin Secret Key"
                        value={key}
                        onChange={(e) => {
                            setKey(e.target.value);
                            setError('');
                        }}
                        autoFocus
                    />
                    {error && <p className="error-message">{error}</p>}
                    <Button className="submit-btn" onClick={() => { }}>Access Dashboard</Button>
                </form>
            </div>
        </div>
    );
};

export default AdminAuth;
