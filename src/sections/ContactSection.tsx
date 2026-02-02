import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { content } from '../data/content';
import Button from '../components/Button';
import '../styles/sections/Contact.scss';

const Contact: React.FC = () => {
    const { contact } = content;
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', phone: '', email: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
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
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={handleChange}
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
                    ></textarea>
                </div>

                <Button className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {isSuccess && (
                    <div className="success-message">
                        Message sent successfully!
                    </div>
                )}
            </form>
        </SectionWrapper>
    );
};

export default Contact;
