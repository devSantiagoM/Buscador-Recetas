'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useOptimizedNavigation() {
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();

    const navigateTo = async (href: string) => {
        if (isNavigating) return;

        setIsNavigating(true);
        
        try {
            // Simular un pequeño delay para mostrar el estado de carga
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Navegar a la ruta
            router.push(href);
        } catch (error) {
            console.error('Error durante la navegación:', error);
        } finally {
            // Resetear el estado después de un tiempo para permitir la transición
            setTimeout(() => setIsNavigating(false), 500);
        }
    };

    return {
        navigateTo,
        isNavigating
    };
} 