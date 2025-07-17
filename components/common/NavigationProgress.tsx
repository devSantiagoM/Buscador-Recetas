'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useOptimizedNavigation } from '../../hooks/useOptimizedNavigation';

export function NavigationProgress() {
    const { isNavigating } = useOptimizedNavigation();

    return (
        <AnimatePresence>
            {isNavigating && (
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-[#6765F0] z-[9999]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                        scaleX: [0, 0.3, 0.7, 1],
                        opacity: [0, 1, 1, 0]
                    }}
                    exit={{ scaleX: 1, opacity: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                    }}
                    style={{ transformOrigin: "left" }}
                />
            )}
        </AnimatePresence>
    );
} 