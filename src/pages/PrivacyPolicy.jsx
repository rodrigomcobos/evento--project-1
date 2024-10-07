import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Components
import SearchNavBar from '../components/SearchNavBar';
import TransparentLogo from '../assets/slides/transparentlogo.png';

const AccordionItem = ({ title, content, isOpen, toggleAccordion }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                className="flex justify-between items-center w-full py-4 px-6 text-left"
                onClick={toggleAccordion}
            >
                <span className="font-semibold">{title}</span>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isOpen && (
                <div className="py-4 px-6">
                    {content.map((item, index) => (
                        <p key={index} className="mb-2">{item}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

const PrivacyPolicy = () => {
    const [openSections, setOpenSections] = useState({});

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const policyContent = [
        {
            title: "1. Information We Collect",
            content: [
                "We collect the following types of personal information:",
                "• Personal Identifiers: When you purchase tickets or interact with our platform, we may collect your name, email address, phone number, and other contact information.",
                "• Payment Information: When you complete a purchase, we collect payment details such as credit card information. We do not store your payment data directly, but it may be processed by trusted third-party payment processors.",
                "• Location Data: If you use location-based services (e.g., searching for events near you), we may collect your location information to provide better recommendations.",
                "• Technical Information: We collect data on how you interact with our platform, including IP addresses, browser type, device information, and cookies, to enhance your experience."
            ]
        },
        {
            title: "2. How We Use Your Information",
            content: [
                "We use the information we collect for the following purposes:",
                "• To Process Transactions: Your personal information is used to process ticket purchases, send you confirmations, and provide customer support.",
                "• To Personalize Your Experience: We may use your data to recommend events, offers, or content based on your preferences and interactions with our platform.",
                "• To Communicate with You: We may send you email notifications about your purchase, upcoming events, or promotional offers. You can opt out of promotional communications at any time.",
                "• To Improve Our Services: We analyze usage data and customer feedback to improve our platform, enhance security, and develop new features.",
                "• To Comply with Legal Obligations: We may process your information to comply with applicable laws, regulations, and legal processes."
            ]
        },
        {
            title: "3. How We Share Your Information",
            content: [
                "We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:",
                "• Service Providers: We may share your information with trusted third-party service providers (e.g., payment processors, email providers) who assist us in operating our platform and delivering our services.",
                "• Event Organizers: When you purchase tickets, we may share your information with event organizers or venues to facilitate your attendance at the event.",
                "• Legal Compliance: We may disclose your information if required by law, such as in response to a subpoena, court order, or other legal process.",
                "• Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new ownership as part of the transaction."
            ]
        },
        {
            title: "4. Cookies and Tracking Technologies",
            content: [
                "We use cookies and similar tracking technologies to collect information about your use of our website and services. Cookies help us remember your preferences, improve site functionality, and deliver personalized content. You can manage your cookie preferences through your browser settings, but please note that disabling cookies may limit certain features on our platform."
            ]
        },
        {
            title: "5. Your Rights and Choices",
            content: [
                "You have the following rights regarding your personal information:",
                "• Access and Update: You can access and update your personal information by logging into your account or contacting us directly.",
                "• Deletion: You can request the deletion of your personal data by contacting us through our Contact Form. Please note that we may retain certain information for legal or operational purposes.",
                "• Opt-Out of Marketing: You can opt out of receiving marketing emails by clicking the \"unsubscribe\" link in any promotional email or by adjusting your communication preferences in your account settings."
            ]
        },
        {
            title: "6. Data Security",
            content: [
                "We take reasonable steps to protect your personal information from unauthorized access, loss, misuse, or disclosure. Our security measures include encryption, firewalls, and secure socket layer (SSL) technology. While we strive to protect your information, no system can guarantee complete security, and you provide your information at your own risk."
            ]
        },
        {
            title: "7. Children's Privacy",
            content: [
                "Our services are not intended for children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have inadvertently collected information from a child under 13, we will take steps to delete such information promptly."
            ]
        },
        {
            title: "8. Changes to This Privacy Policy",
            content: [
                "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. If we make significant changes, we will notify you via email or through a notice on our website. Your continued use of our services after any changes to this Privacy Policy will constitute your acceptance of the updated policy."
            ]
        },
        {
            title: "9. Contact Us",
            content: [
                "If you have any questions or concerns about this Privacy Policy, or if you would like to exercise your rights regarding your personal information, please contact us through our Contact Form."
            ]
        }
    ];

    return (
        <div>
            <SearchNavBar />
            {/* Privacy Policy Strip */}
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">Privacy Policy</h1>

                    {/* Transparent logo positioned at the bottom right */}
                    <div className="absolute bottom-0 right-0 h-full w-full pointer-events-none overflow-hidden">
                        <img
                            src={TransparentLogo}
                            alt="Logo"
                            className="object-cover opacity-25%"
                            style={{
                                position: 'absolute',
                                bottom: '-30px',
                                right: '-30px',
                                width: '50%',
                                maxWidth: '275px',
                            }}
                        />
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto mt-8 mb-16 px-6">
                <p className="text-gray-600 mb-6">
                    At Evento, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services, visit our website, or purchase tickets through our platform. By using our services, you agree to the practices described in this Privacy Policy.
                </p>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {policyContent.map((section, index) => (
                        <AccordionItem
                            key={index}
                            title={section.title}
                            content={section.content}
                            isOpen={openSections[section.title] || false}
                            toggleAccordion={() => toggleSection(section.title)}
                        />
                    ))}
                </div>

                <p className="text-gray-600 mt-6">
                    By using Evento's services, you agree to this Privacy Policy. We encourage you to review this policy regularly to stay informed about how we protect your privacy.
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;