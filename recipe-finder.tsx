"use client"

import { useState } from "react"
import { Search, Clock, Users, ChefHat, Heart, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const categories = [
  { name: "Desayuno", emoji: "🥞", color: "bg-orange-100 text-orange-800" },
  { name: "Almuerzo", emoji: "🍽️", color: "bg-green-100 text-green-800" },
  { name: "Cena", emoji: "🍖", color: "bg-purple-100 text-purple-800" },
  { name: "Postres", emoji: "🍰", color: "bg-pink-100 text-pink-800" },
  { name: "Snacks", emoji: "🍿", color: "bg-yellow-100 text-yellow-800" },
  { name: "Bebidas", emoji: "🥤", color: "bg-blue-100 text-blue-800" },
]

const recipes = [
  {
    id: 1,
    title: "Pancakes Esponjosos de Arándanos",
    category: "Desayuno",
    time: "15 min",
    servings: 4,
    difficulty: "Fácil",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    description: "Deliciosos pancakes súper esponjosos con arándanos frescos",
    tags: ["Sin gluten", "Vegetariano"],
  },
  {
    id: 2,
    title: "Tacos de Pescado Tropical",
    category: "Almuerzo",
    time: "25 min",
    servings: 3,
    difficulty: "Medio",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    description: "Tacos frescos con pescado a la plancha y salsa de mango",
    tags: ["Saludable", "Picante"],
  },
  {
    id: 3,
    title: "Brownies de Chocolate Negro",
    category: "Postres",
    time: "45 min",
    servings: 8,
    difficulty: "Fácil",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    description: "Brownies súper chocolatosos y húmedos, irresistibles",
    tags: ["Chocolate", "Casero"],
  },
  {
    id: 4,
    title: "Ensalada Arcoíris Mediterránea",
    category: "Almuerzo",
    time: "10 min",
    servings: 2,
    difficulty: "Fácil",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    description: "Ensalada colorida con ingredientes frescos del mediterráneo",
    tags: ["Vegano", "Saludable"],
  },
  {
    id: 5,
    title: "Smoothie Bowl Tropical",
    category: "Desayuno",
    time: "8 min",
    servings: 1,
    difficulty: "Fácil",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    description: "Bowl cremoso con frutas tropicales y toppings crujientes",
    tags: ["Vegano", "Saludable"],
  },
  {
    id: 6,
    title: "Pizza Margarita Casera",
    category: "Cena",
    time: "35 min",
    servings: 4,
    difficulty: "Medio",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    description: "Pizza clásica con masa casera y ingredientes frescos",
    tags: ["Vegetariano", "Casero"],
  },
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(recipe.category)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-2 rounded-xl">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                RecetasFáciles
              </h1>
            </div>
            <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent">
              <Heart className="h-4 w-4 mr-2" />
              Mis Favoritas
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            ¡Cocina con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Alegría</span>!
            🍳
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre recetas deliciosas y fáciles que harán que cocinar sea tu momento favorito del día
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="¿Qué te apetece cocinar hoy? 🤔"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-orange-200 focus:border-orange-400 rounded-2xl bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategories((prev) =>
                    prev.includes(category.name) ? prev.filter((c) => c !== category.name) : [...prev, category.name],
                  )
                }}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all hover:scale-105 ${
                  selectedCategories.includes(category.name)
                    ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg"
                    : "border-2 border-orange-200 hover:border-orange-400 bg-white/80"
                }`}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800">{filteredRecipes.length} recetas encontradas 🎉</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-orange-300 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem>Vegetariano</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Vegano</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Sin gluten</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Saludable</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-orange-100 hover:border-orange-300 rounded-2xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(recipe.id)}
                  className={`absolute top-3 right-3 rounded-full ${
                    favorites.includes(recipe.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-white/80 text-gray-600 hover:bg-white"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(recipe.id) ? "fill-current" : ""}`} />
                </Button>
                <Badge
                  className={`absolute top-3 left-3 ${
                    categories.find((c) => c.name === recipe.category)?.color || "bg-gray-100"
                  }`}
                >
                  {categories.find((c) => c.name === recipe.category)?.emoji} {recipe.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {recipe.title}
                </h3>
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
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-medium rounded-xl">
                  Ver Receta Completa 👨‍🍳
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤷‍♀️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Ups! No encontramos recetas</h3>
            <p className="text-gray-600">Prueba con otros términos de búsqueda o categorías diferentes</p>
          </div>
        )}
      </main>

      {/* Footer */}
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
          <p className="text-gray-600">Cocinando sonrisas desde 2024 🍽️✨</p>
        </div>
      </footer>
    </div>
  )
}
