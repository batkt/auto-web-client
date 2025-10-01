'use client';

import React from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaPinterest, FaLink } from 'react-icons/fa6';

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
    variant?: 'default' | 'minimal';
    className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
    url,
    title,
    variant = 'default',
    className = ''
}) => {
    const shareToFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const shareToTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    };

    const shareToWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`, '_blank');
    };

    const shareToLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareToPinterest = () => {
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`, '_blank');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            alert('Холбоос хуулагдлаа!');
        }).catch(() => {
            alert('Хуулах үед алдаа гарлаа');
        });
    };

    // Minimal variant (just clean circular icons)
    if (variant === 'minimal') {
        return (
            <div className={`flex items-center gap-3 ${className}`}>
                <button
                    onClick={shareToLinkedIn}
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition-colors"
                    title="LinkedIn дээр хуваалцах"
                >
                    <FaLinkedin className="text-base" />
                </button>

                <button
                    onClick={shareToFacebook}
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition-colors"
                    title="Facebook дээр хуваалцах"
                >
                    <FaFacebook className="text-base" />
                </button>

                <button
                    onClick={shareToTwitter}
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-sky-500 hover:text-sky-500 transition-colors"
                    title="Twitter дээр хуваалцах"
                >
                    <FaTwitter className="text-base" />
                </button>

                <button
                    onClick={shareToPinterest}
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors"
                    title="Pinterest дээр хуваалцах"
                >
                    <FaPinterest className="text-base" />
                </button>
            </div>
        );
    }

    // Default variant (with background colors and WhatsApp/Copy)
    return (
        <div className={`bg-card border rounded-lg p-6 ${className}`}>
            <h3 className="text-lg font-semibold mb-4">
                Хуваалцах
            </h3>
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={shareToLinkedIn}
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                    title="LinkedIn дээр хуваалцах"
                >
                    <FaLinkedin className="text-white text-base" />
                </button>

                <button
                    onClick={shareToFacebook}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                    title="Facebook дээр хуваалцах"
                >
                    <FaFacebook className="text-white text-base" />
                </button>

                <button
                    onClick={shareToTwitter}
                    className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors"
                    title="Twitter дээр хуваалцах"
                >
                    <FaTwitter className="text-white text-base" />
                </button>

                <button
                    onClick={shareToPinterest}
                    className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                    title="Pinterest дээр хуваалцах"
                >
                    <FaPinterest className="text-white text-base" />
                </button>

                <button
                    onClick={shareToWhatsApp}
                    className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                    title="WhatsApp дээр хуваалцах"
                >
                    <FaWhatsapp className="text-white text-base" />
                </button>

                <button
                    onClick={copyToClipboard}
                    className="w-10 h-10 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                    title="Холбоос хуулах"
                >
                    <FaLink className="text-white text-base" />
                </button>
            </div>
        </div>
    );
};

export default SocialShare; 