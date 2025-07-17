# 🍳 RecetasFáciles - Buscador de Recetas

Una aplicación web moderna y elegante para descubrir, buscar y guardar recetas deliciosas. Desarrollada con Next.js 15, TypeScript y una interfaz de usuario hermosa y responsiva.

![RecetasFáciles](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Características Principales

### 🔍 **Búsqueda Inteligente**

- **Búsqueda por nombre**: Encuentra recetas por ingredientes o nombres
- **Búsqueda con Enter**: Experiencia optimizada para desktop y móvil
- **Validación de seguridad**: Protección contra XSS y ataques maliciosos
- **Rate limiting**: Protección contra spam de búsquedas

### ❤️ **Sistema de Favoritos**

- **Persistencia local**: Los favoritos se guardan en localStorage
- **Sincronización global**: Estado compartido entre todas las páginas
- **Contador dinámico**: Muestra la cantidad de favoritos en tiempo real
- **Botones interactivos**: Corazones que cambian de estado visualmente

### 🎨 **Interfaz Moderna**

- **Diseño responsivo**: Optimizado para móvil y desktop
- **Animaciones suaves**: Transiciones elegantes con Framer Motion
- **Gradientes hermosos**: Paleta de colores naranja-rosa
- **Componentes reutilizables**: UI consistente en toda la aplicación

### 📱 **Experiencia de Usuario**

- **Navegación intuitiva**: Header con menú hamburguesa para móvil
- **Paginación progresiva**: Carga más recetas con botón "Ver más"
- **Estados de carga**: Skeleton loaders durante las peticiones
- **Mensajes informativos**: Feedback claro para el usuario

## 🚀 Tecnologías Utilizadas

### **Frontend**

- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS 4** - Framework de CSS utility-first
- **Framer Motion** - Animaciones y transiciones
- **Lucide React** - Iconografía moderna

### **Estado y Datos**

- **Redux Toolkit** - Gestión de estado global
- **React Context** - Estado de favoritos compartido
- **Axios** - Cliente HTTP para peticiones a API
- **Zod** - Validación de esquemas

### **UI Components**

- **Radix UI** - Componentes accesibles y personalizables
- **Class Variance Authority** - Variantes de componentes
- **Tailwind Merge** - Combinación inteligente de clases

## 📁 Estructura del Proyecto

```
buscador-recetas/
├── app/                    # App Router de Next.js
│   ├── page.tsx           # Página principal
│   ├── favorites/         # Página de favoritos
│   ├── recipe/[id]/       # Página de detalle de receta
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (Button, Input, etc.)
│   ├── recipe-card.tsx   # Tarjeta de receta
│   ├── header.tsx        # Header con navegación
│   └── footer.tsx        # Footer
├── context/              # Contextos de React
│   └── FavoritesContext.tsx  # Estado global de favoritos
├── hooks/                # Custom hooks
│   └── useFavorites.ts   # Hook para manejar favoritos
├── lib/                  # Utilidades y configuración
│   ├── features/         # Slices de Redux
│   ├── types.ts          # Tipos TypeScript
│   ├── validation.ts     # Validación con Zod
│   └── store.ts          # Configuración de Redux
├── api/                  # Servicios de API
│   ├── api.ts            # Funciones de API
│   └── axiosInstance.ts  # Configuración de Axios
└── public/               # Archivos estáticos
```

## 🎯 Funcionalidades Detalladas

### **Búsqueda de Recetas**

- **Búsqueda por texto**: Escribe ingredientes o nombres de recetas
- **Búsqueda por categorías**: Filtra por tipo de comida
- **Filtros por tags**: Filtra por etiquetas específicas
- **Resultados en tiempo real**: Actualización instantánea

### **Gestión de Favoritos**

- **Agregar/Quitar**: Click en el corazón de cualquier receta
- **Persistencia**: Los favoritos se mantienen entre sesiones
- **Sincronización**: Estado compartido en toda la aplicación
- **Página dedicada**: Vista completa de recetas favoritas

### **Detalles de Receta**

- **Información completa**: Ingredientes, instrucciones, nutrición
- **Ajuste de porciones**: Calculadora automática de ingredientes
- **Botones de acción**: Favoritos, compartir, imprimir
- **Información nutricional**: Calorías, proteínas, carbohidratos, grasas

## 🔧 Configuración de Desarrollo

### **Scripts Disponibles**

```json
{
  "dev": "next dev --turbopack", // Desarrollo con Turbopack
  "build": "next build", // Construcción para producción
  "start": "next start", // Servidor de producción
  "lint": "next lint" // Linting del código
}
```

### **Configuración de Next.js**

- **Turbopack**: Compilación rápida en desarrollo
- **App Router**: Nueva arquitectura de Next.js
- **TypeScript**: Configuración estricta
- **Tailwind CSS**: Configuración optimizada

### **Configuración de API**

- **Base URL**: TheMealDB API
- **Timeout**: 10 segundos
- **Interceptores**: Manejo global de errores
- **Validación**: Sanitización de parámetros

## 🎨 Diseño y UX

### **Paleta de Colores**

- **Primario**: Gradientes naranja-rosa
- **Secundario**: Verde, púrpura, amarillo
- **Neutro**: Grises y blancos
- **Acentos**: Rojo para favoritos

### **Tipografía**

- **Fuente**: Inter (Google Fonts)
- **Jerarquía**: Títulos, subtítulos, cuerpo
- **Responsive**: Tamaños adaptativos

### **Componentes**

- **Cards**: Diseño moderno con hover effects
- **Botones**: Variantes con estados
- **Inputs**: Validación visual
- **Navegación**: Menú hamburguesa para móvil

## 🔒 Seguridad

### **Validación de Entrada**

- **Zod schemas**: Validación estricta de tipos
- **Sanitización**: Limpieza de caracteres especiales
- **Rate limiting**: Protección contra spam
- **XSS Protection**: Bloqueo de scripts maliciosos

### **API Security**

- **HTTPS**: Conexiones seguras
- **Timeout**: Prevención de ataques DoS
- **Error handling**: Manejo seguro de errores
- **Input validation**: Validación en frontend y backend

## 📱 Responsive Design

### **Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Adaptaciones**

- **Grid responsivo**: 1, 2, o 3 columnas según pantalla
- **Navegación móvil**: Menú hamburguesa
- **Paginación adaptativa**: Menos elementos en móvil
- **Touch friendly**: Botones y elementos táctiles

## 🚀 Despliegue

### **Plataformas Soportadas**

- **Vercel**: Despliegue automático
- **Netlify**: Build y deploy
- **Railway**: Despliegue con Docker
- **VPS**: Despliegue manual

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Santiago Martinez** - [Mi portfolio](https://santiagomartinez-developer.vercel.app/)

---

⭐ **¡Si te gusta este proyecto, dale una estrella!**
