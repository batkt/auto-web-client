"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    {
        url: "https://images.unsplash.com/photo-1749497683202-d3073573d996?q=80&w=1847&auto=format&fit=crop",
    },
    {
        url: "https://images.unsplash.com/photo-1750779940886-edfa73b5c5c6?q=80&w=1740&auto=format&fit=crop",
    },
    {
        url: "https://images.unsplash.com/photo-1744360820096-1a40015ca890?q=80&w=1740&auto=format&fit=crop",
    },
];

export default function App() {
    const [activeImage, setActiveImage] = useState(images[0].url);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* --- PAGE BACKGROUND --- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeImage}
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.9 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{
                        backgroundImage: `url('${activeImage}')`,
                    }}
                    className="fixed inset-0 -z-10 bg-cover bg-center"
                />
            </AnimatePresence>

            {/* --- CARDS --- */}
            <div className="flex flex-wrap gap-8 justify-center relative z-10">
                {images.map((img, index) => (
                    <ClipCard
                        key={index}
                        imgUrl={img.url}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                        onExpand={() => {
                            setFullscreenImage(img.url)
                        }}
                        isHidden={fullscreenImage !== null && fullscreenImage !== img.url}
                    />
                ))}
            </div>

            {/* --- FULLSCREEN MODAL --- */}
            <AnimatePresence>
                {fullscreenImage && (
                    <>
                        {/* Dark overlay */}
                        <motion.div
                            className="fixed inset-0 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setFullscreenImage(null)}
                        />

                        {/* Fullscreen card */}
                        <motion.div
                            layoutId={`card-${fullscreenImage}`}
                            className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
                            onClick={() => setFullscreenImage(null)}
                            // style={{
                            //     WebkitMaskImage: mask,
                            //     maskImage: mask,
                            // }}
                            initial={{ borderRadius: "50%" }}
                            animate={{
                                borderRadius: "0px",
                            }}
                            onAnimationEnd={() => {
                                setFullscreenImage(null);
                            }}
                            exit={{
                                borderRadius: "0px",
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.25, 0.8, 0.25, 1],
                                type: "tween"
                            }}
                        >
                            <motion.div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('${fullscreenImage}')`,
                                }}
                                layoutId={`image-${fullscreenImage}`}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.25, 0.8, 0.25, 1],
                                }}
                            />

                            {/* Close instruction */}
                            {/* <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute top-8 right-8 text-white text-lg font-medium z-20 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
                            >
                                Click to close
                            </motion.div> */}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

const ClipCard = ({
    imgUrl,
    setActiveImage,
    onExpand,
    isHidden,
}: {
    imgUrl: string;
    activeImage: string;
    setActiveImage: (url: string) => void;
    onExpand: () => void;
    isHidden: boolean;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const updatePosition = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setPosition({
                x: rect.left,
                y: rect.top,
            });
        }
    };

    useEffect(() => {
        updatePosition();
        window.addEventListener("resize", updatePosition);
        return () => window.removeEventListener("resize", updatePosition);
    }, []);

    const handleClick = () => {
        setActiveImage(imgUrl);
        onExpand();
    };

    return (
        <motion.div
            ref={containerRef}
            layoutId={`card-${imgUrl}`}
            className="relative w-[300px] sm:w-[400px] aspect-[4/5] overflow-hidden rounded-xl shadow-xl cursor-pointer"
            onClick={handleClick}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.8, 0.25, 1],
                type: "tween"
            }}
            animate={{
                opacity: isHidden ? 0.3 : 1,
                scale: isHidden ? 0.95 : 1,
            }}
        >
            <motion.div
                layoutId={`image-${imgUrl}`}
                style={{
                    backgroundImage: `url('${imgUrl}')`,
                    top: `-${position.y}px`,
                    left: `-${position.x}px`,
                }}
                className="absolute w-screen h-screen bg-cover bg-center"
                transition={{
                    duration: 0.8,
                    ease: [0.25, 0.8, 0.25, 1],
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 z-10" />
        </motion.div>
    );
};