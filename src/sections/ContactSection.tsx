import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { content } from '../data/content';
import Button from '../components/Button';
import { sendContactMessage } from '../services/contactService';
import '../styles/sections/Contact.scss';

const Contact: React.FC = () => {
    const { contact } = content;
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = React.useState<{
        type: 'idle' | 'loading' | 'success' | 'error';
        message: string;
    }>({ type: 'idle', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: '' });

        if (!formData.phone.trim()) {
            setStatus({ type: 'error', message: 'Phone number is required' });
            return;
        }
        try {
            const successMessage = await sendContactMessage(formData);

            setStatus({ type: 'success', message: successMessage });
            setFormData({ name: '', phone: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus({ type: 'idle', message: '' });
            }, 5000);
        } catch (error: any) {
            console.error('Contact submission error:', error);
            setStatus({ type: 'error', message: error.message });
        }
    };

    return (
        <SectionWrapper id="contact" className="contact">
            <h2 className="section-title">04. What's Next?</h2>
            <h2 className="title">{contact.title}</h2>
            <p className="description">{contact.text}</p>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status.type === 'loading'}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={status.type === 'loading'}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={status.type === 'loading'}
                    />
                </div>
                <div className="form-group full-width">
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={status.type === 'loading'}
                    ></textarea>
                </div>

                <Button className="submit-btn" disabled={status.type === 'loading'}>
                    {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>

                {status.message && (
                    <div className={`status-message ${status.type}`}>
                        {status.message}
                    </div>
                )}
            </form>
        </SectionWrapper>
    );
};

export default Contact;
