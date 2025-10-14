'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        userType: '',
        companyName: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: 'bbb2d5f5-41cd-4761-b498-17dccd6985ac',
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message,
                    userType: formData.userType,
                    companyName: formData.companyName,
                    from_name: 'Bright Leasing Contact Form',
                    reply_to: formData.email,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                    userType: '',
                    companyName: ''
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const
            }
        }
    };


    return (
        <main className="min-h-screen bg-gradient-to-br from-brand-cream/30 via-white to-brand-yellow/10 overflow-hidden">
            {/* ************************************************************
                          HERO SECTION
      ************************************************************ */}
            <section className="relative bg-gradient-to-r from-brand-black via-brand-black/95 to-brand-black/90 text-white py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 via-transparent to-brand-teal/10"></div>
                <div className="relative max-w-7xl mx-auto px-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Mail className="w-4 h-4" />
                            <span>Get In Touch</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-6xl font-bold mb-6 leading-tight">
                            Let&apos;s <span className="text-brand-yellow">Connect</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-white/80 mb-8 leading-relaxed">
                            Ready to get started with novated leasing? We&apos;re here to help you find the perfect solution for your automotive needs.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ************************************************************
                          CONTACT SECTION
      ************************************************************ */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
                    >
                        {/* ************************************************************
                                CONTACT INFO
            ************************************************************ */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            <div>
                                <h2 className="text-4xl font-bold text-brand-black mb-6">
                                    Get in Touch
                                </h2>
                                <p className="text-brand-black/70 text-lg leading-relaxed">
                                    Have questions about novated leasing? We&apos;re here to help! Send us a message and we&apos;ll get back to you within 24 hours.
                                </p>

                                <div className="mt-8">
                                    <Image
                                        src="/images/brightlogo.png"
                                        alt="Bright Leasing"
                                        width={300}
                                        height={200}
                                        className="w-full max-w-sm h-auto rounded-lg"
                                    />
                                </div>
                            </div>


                        </motion.div>

                        {/* ************************************************************
                                CONTACT FORM
            ************************************************************ */}
                        <motion.div variants={itemVariants} className="relative">
                            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-brand-yellow/20">
                                <h3 className="text-2xl font-bold text-brand-black mb-6">Send us a Message</h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-brand-yellow/30 rounded-xl focus:border-brand-yellow focus:outline-none bg-brand-cream/30 transition-colors"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-brand-yellow/30 rounded-xl focus:border-brand-yellow focus:outline-none bg-brand-cream/30 transition-colors"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    {/* ************************************************************
                                            USER TYPE SELECTION
                                    ************************************************************ */}
                                    <div>
                                        <label className="block text-sm font-medium text-brand-black mb-3">
                                            I am a: *
                                        </label>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="userType"
                                                    value="Employee"
                                                    checked={formData.userType === 'Employee'}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                                />
                                                <span className="text-brand-black font-medium">Employee</span>
                                            </label>
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="userType"
                                                    value="Employer"
                                                    checked={formData.userType === 'Employer'}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-4 h-4 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-2"
                                                />
                                                <span className="text-brand-black font-medium">Employer</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* ************************************************************
                                            COMPANY NAME FIELD
                                    ************************************************************ */}
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-medium text-brand-black mb-2">
                                            Company Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-brand-yellow/30 rounded-xl focus:border-brand-yellow focus:outline-none bg-brand-cream/30 transition-colors"
                                            placeholder="Your company name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-brand-yellow/30 rounded-xl focus:border-brand-yellow focus:outline-none bg-brand-cream/30 transition-colors"
                                                placeholder="0400 000 000"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-brand-black mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-brand-yellow/30 rounded-xl focus:border-brand-yellow focus:outline-none bg-brand-cream/30 transition-colors"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="Novated Leasing Inquiry">Novated Leasing Inquiry</option>
                                                <option value="General Question">General Question</option>
                                                <option value="Existing Customer">Existing Customer</option>
                                                <option value="Partnership">Partnership</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 border border-brand-yellow/30 rounded-xl focus:border-brand-yellow focus:outline-none bg-brand-cream/30 transition-colors resize-none"
                                            placeholder="Tell us about your automotive needs and how we can help..."
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-brand-yellow text-brand-black py-4 px-8 rounded-xl font-semibold hover:bg-brand-yellow/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>

                                    {/* ************************************************************
                                      STATUS MESSAGES
                  ************************************************************ */}
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Message sent successfully! We&apos;ll get back to you soon.</span>
                                        </motion.div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                                        >
                                            <AlertCircle className="w-5 h-5" />
                                            <span>Something went wrong. Please try again or contact us directly.</span>
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ************************************************************
                          CTA SECTION
      ************************************************************ */}

        </main>
    );
}
