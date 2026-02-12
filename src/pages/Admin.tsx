import React, { useState, useEffect } from 'react';
import { getAdminKey, getAdminContacts, clearAdminKey, getAdminSummary, exportContactsCSV } from '../services/adminService';
import AdminAuth from '../components/AdminAuth';
import Button from '../components/Button';
import '../styles/sections/Admin.scss';

// Define types for content
interface Contact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
}

const Admin: React.FC = () => {
    // 1. Single source of truth: sessionStorage
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAdminKey());
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [adminSummary, setAdminSummary] = useState<any>(null); // Using any to avoid importing extra types for now, can refine
    const [loading, setLoading] = useState<boolean>(false);
    const [exportLoading, setExportLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    // Function to load data
    const loadData = async (currentPage: number) => {
        setLoading(true);
        setError('');
        try {
            // Parallel execution for better performance
            const [contactsRes, summaryRes] = await Promise.all([
                getAdminContacts(currentPage),
                getAdminSummary()
            ]);

            setContacts(contactsRes.data);
            setTotalPages(contactsRes.meta.totalPages);
            setAdminSummary(summaryRes.data);
        } catch (err: any) {
            setError(err.message || 'Failed to load data');
            // Only logout if explicitly unauthorized (checked via service error message)
            if (err.message === 'Session expired or invalid key') {
                setIsAuthenticated(false);
            }
        } finally {
            setLoading(false);
        }
    };

    // Initial load when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadData(page);
        }
    }, [isAuthenticated, page]);

    const handleLogin = () => {
        setIsAuthenticated(true);
        // Page state will trigger loadData effect
    };

    const handleLogout = () => {
        clearAdminKey();
        setIsAuthenticated(false);
        setContacts([]);
        setAdminSummary(null);
        setPage(1);
    };

    const handleExport = async () => {
        setExportLoading(true);
        try {
            await exportContactsCSV();
        } catch (err: any) {
            alert(err.message || 'Failed to export CSV');
        } finally {
            setExportLoading(false);
        }
    };

    if (!isAuthenticated) {
        return <AdminAuth onAuthenticated={handleLogin} />;
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="header-left">
                    <h1>Admin Dashboard</h1>
                </div>
                <div className="header-right">
                    <Button
                        className="export-btn"
                        onClick={handleExport}
                        disabled={exportLoading}
                    >
                        {exportLoading ? 'Downloading...' : 'Export CSV'}
                    </Button>
                    <Button className="logout-btn" onClick={handleLogout}>Logout</Button>
                </div>
            </header>

            <div className="admin-content">
                {error && <div className="error-banner">{error}</div>}

                {/* Summary Section */}
                {adminSummary && (
                    <div className="admin-summary">
                        <div className="summary-card">
                            <h3>Total Contacts</h3>
                            <div className="value">{adminSummary.total}</div>
                        </div>
                        <div className="summary-card">
                            <h3>Last 7 Days</h3>
                            <div className="value">{adminSummary.last7Days}</div>
                        </div>
                        <div className="summary-card">
                            <h3>Last 30 Days</h3>
                            <div className="value">{adminSummary.last30Days}</div>
                        </div>
                        <div className="summary-card">
                            <h3>Latest Activity</h3>
                            <div className="value date">
                                {adminSummary.latestActivity
                                    ? new Date(adminSummary.latestActivity).toLocaleDateString()
                                    : 'N/A'}
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="loading-state">Loading contacts...</div>
                ) : contacts.length === 0 ? (
                    <div className="empty-state">No contact submissions found.</div>
                ) : (
                    <>
                        <div className="table-container">
                            <table className="contacts-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((contact) => (
                                        <tr key={contact._id}>
                                            <td className="date-col">
                                                {new Intl.DateTimeFormat('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                }).format(new Date(contact.createdAt)).replace(',', ' •')}
                                            </td>
                                            <td className="name-col">{contact.name}</td>
                                            <td className="email-col">
                                                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                            </td>
                                            <td className="phone-col">{contact.phone}</td>
                                            <td className="message-col" title={contact.message}>
                                                {contact.message.length > 50
                                                    ? `${contact.message.substring(0, 50)}...`
                                                    : contact.message}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                            >
                                Previous
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Admin;
