import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Зургийн цомог',
    description: 'Монгол Христийн Сүмийн зургийн цомог. Сүмийн үйл ажиллагаа, баярууд, нийгэмлэгийн амьдралын дурсамжийн зургууд. Манай сүмийн олон жилийн түүхийг зургаар үзээрэй.',
    keywords: [
        'Монгол Христийн Сүм',
        'зурагууд',
        'зургийн цомог',
        'сүмийн зурагууд',
        'дурсамж',
        'баярууд',
        'үйл ажиллагаа',
        'нийгэмлэгийн амьдрал',
        'түүх'
    ],
    openGraph: {
        title: 'Зургийн цомог | Монгол Христийн Сүм',
        description: 'Монгол Христийн Сүмийн зургийн цомог. Сүмийн үйл ажиллагаа, баярууд, нийгэмлэгийн амьдралын дурсамжийн зургууд.',
        images: [
            {
                url: '/assets/images/hero-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Монгол Христийн Сүм - Зургийн цомог',
            },
        ],
    },
};

export default function ImageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 