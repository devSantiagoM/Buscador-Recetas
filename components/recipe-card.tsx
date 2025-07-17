"use client"
import Link from "next/link"
import Image from "next/image"
import { Clock, Users, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Recipe, categories } from "@/lib/types"
import { useFavorites } from "@/hooks/useFavorites"

interface RecipeCardProps {
  recipe: Recipe
  priority?: boolean
  blurDataURL?: string
}

export function RecipeCard({ recipe, priority = false, blurDataURL }: RecipeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-orange-100 hover:border-orange-300 rounded-2xl overflow-hidden">
      <div className="relative">
        <Link href={`/recipe/${recipe.id}`}>
          <Image
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            width={400}
            height={267}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            placeholder={blurDataURL ? "blur" : undefined}
            blurDataURL={blurDataURL}
          />
        </Link>
        {/* El botón Heart debe estar fuera del Link y con z-index alto para ser clickeable */}
        <div className="absolute top-3 right-3 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(recipe.id)}
            className={`rounded-full ${isFavorite(recipe.id)
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/80 text-gray-600 hover:bg-white"
              }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite(recipe.id) ? "fill-current" : ""}`} />
          </Button>
        </div>
        <Badge
          className={`absolute top-3 left-3 ${categories.find((c) => c.name === recipe.category)?.color || "bg-gray-100"
            }`}
        >
          {categories.find((c) => c.name === recipe.category)?.emoji} {recipe.category}
        </Badge>
      </div>

      <CardContent className="p-6">
        <Link href={`/recipe/${recipe.id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors cursor-pointer">
            {recipe.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 text-sm">{recipe.description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {recipe.time}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {recipe.servings} personas
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {recipe.rating}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {[...new Set(recipe.tags.slice(0, 3))].map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
              {tag}
            </Badge>
          ))}
        </div>

        <Button href={`/recipe/${recipe.id}`} className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-medium rounded-xl">
          Ver Receta Completa 👨‍🍳
        </Button>
      </CardContent>
    </Card>
  )
}
