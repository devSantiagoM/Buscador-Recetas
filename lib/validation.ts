import { z } from 'zod';

// Schema de validación para búsquedas
export const searchSchema = z.object({
  query: z.string()
    .max(100, 'Máximo 100 caracteres')
    .regex(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,!?-]*$/, 'Solo se permiten letras, números y espacios')
    .transform((val) => val.trim())
    .refine((val) => {
      // Si está vacío, permitir (para poder borrar completamente)
      if (val === '') return true;
      
      const dangerousPatterns = [
        /script/i, /javascript:/i, /on\w+\s*=/i, /<iframe/i,
        /union\s+select/i, /drop\s+table/i, /exec\s*\(/i, /eval\s*\(/i
      ];
      return !dangerousPatterns.some(pattern => pattern.test(val));
    }, 'Contenido no permitido')
});

// Schema para rate limiting
export const rateLimitSchema = z.object({
  term: z.string(),
  timestamp: z.number()
});

// Función optimizada de validación
export function validateSearch(input: string) {
  try {
    const result = searchSchema.parse({ query: input });
    return { success: true, data: result.query, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, data: null, error: error.issues[0]?.message || 'Error de validación' };
    }
    return { success: false, data: null, error: 'Error de validación' };
  }
}

// Rate limiting optimizado
export function checkRateLimit(
  currentTerm: string, 
  lastSearch: { term: string; timestamp: number },
  windowMs: number = 1000
): boolean {
  const now = Date.now();
  return !(lastSearch.term === currentTerm && (now - lastSearch.timestamp) < windowMs);
} 