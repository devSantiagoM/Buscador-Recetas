import { ChefHat } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-orange-200 mt-16">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-2 rounded-xl">
            <ChefHat className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            RecetasFáciles
          </span>
        </div>
        <p className="text-gray-600 mb-1">Cocinando sonrisas desde 2025 🍽️✨</p>

      </div>
      <div className="text-center text-xs text-gray-400 pb-4">
        © 2025 - Hecho por
        <a
          href={process.env.NEXT_PUBLIC_PORTF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:underline"
        >
          <span>{process.env.NEXT_PUBLIC_PORTF_NAME}</span>
        </a>
      </div>
    </footer>
  )
}
