"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Clock, Users, ChefHat, Heart, Star, ArrowLeft, Share2, Printer, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchRecipeById, clearCurrentRecipe } from "@/lib/features/recipes/recipeSlices"
import { loadFavorites } from "@/lib/features/favorites/favoritesSlice"
import { categories } from "@/lib/types"
import Image from "next/image"
import { useFavorites } from "@/context/FavoritesContext";

export default function RecipePage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [servings, setServings] = useState(1)

  const { currentRecipe: recipe, loading } = useAppSelector((state) => state.recipes)
  const { isFavorite, toggleFavorite } = useFavorites();

  const recipeId = params.id as string

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      dispatch(loadFavorites(JSON.parse(savedFavorites)))
    }
  }, [dispatch])

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeById(recipeId))
    }

    return () => {
      dispatch(clearCurrentRecipe())
    }
  }, [dispatch, recipeId])

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings)
    }
  }, [recipe])

  const adjustIngredients = (ingredient: string) => {
    if (!recipe) return ingredient
    const ratio = servings / recipe.servings
    return ingredient.replace(/(\d+(?:\.\d+)?)/g, (match) => {
      const num = Number.parseFloat(match)
      return (num * ratio).toFixed(1).replace(/\.0$/, "")
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-24 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-80 bg-gray-200 rounded-2xl mb-8"></div>
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-24 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Receta no encontrada</h2>
          <Button onClick={() => router.push("/")} className="bg-gradient-to-r from-orange-400 to-pink-500">
            Volver al inicio
          </Button>
        </div>
      </div>
    )
  }

  const categoryInfo = categories.find((c) => c.name === recipe.category)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6 border-orange-300 text-orange-600 hover:bg-orange-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image and Title */}
            <div className="relative mb-8">
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-2xl"
                priority={true}
              />
              <div className="absolute inset-0 bg-black/20 rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={categoryInfo?.color || "bg-gray-100"}>
                    {categoryInfo?.emoji} {recipe.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-white">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{recipe.rating}</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{recipe.title}</h1>
                <p className="text-white/90 text-lg">{recipe.description}</p>
              </div>
            </div>

            {/* Recipe Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Tiempo total</p>
                  <p className="font-bold text-gray-800">{recipe.time}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Porciones</p>
                  <p className="font-bold text-gray-800">{recipe.servings}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
                <CardContent className="p-4 text-center">
                  <ChefHat className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Dificultad</p>
                  <p className="font-bold text-gray-800">{recipe.difficulty}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">🔥</div>
                  <p className="text-sm text-gray-600">Calorías</p>
                  <p className="font-bold text-gray-800">{recipe.nutrition.calories}</p>
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-orange-100 text-orange-700">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Instructions */}
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">👩‍🍳 Instrucciones</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <CardContent className="p-4 space-y-3">
                <Button
                  onClick={() => toggleFavorite(recipe.id)}
                  className={`w-full ${isFavorite(recipe.id)
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white border-2 border-red-200 text-red-600 hover:bg-red-50"
                    }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite(recipe.id) ? "fill-current" : ""}`} />
                  {isFavorite(recipe.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: recipe.title,
                        text: recipe.description,
                        url: window.location.href,
                      })
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir receta
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                  onClick={() => window.print()}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir receta
                </Button>
                {recipe.youtube && (
                  <Button
                    variant="outline"
                    className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                    onClick={() => window.open(recipe.youtube, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver en YouTube
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center justify-between">
                  🛒 Ingredientes
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="text-sm font-normal">{servings} porciones</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setServings(servings + 1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{adjustIngredients(ingredient)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Nutrition Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">📊 Información Nutricional</CardTitle>
                <p className="text-sm text-gray-600">Por porción</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calorías</span>
                  <span className="font-medium">
                    {Math.round((recipe.nutrition.calories * servings) / recipe.servings)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Proteínas</span>
                  <span className="font-medium">{recipe.nutrition.protein}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbohidratos</span>
                  <span className="font-medium">{recipe.nutrition.carbs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grasas</span>
                  <span className="font-medium">{recipe.nutrition.fat}</span>
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <CardContent className="p-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ChefHat className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Creado por</h3>
                <p className="text-orange-600 font-medium">{recipe.author}</p>
                <p className="text-sm text-gray-600 mt-1">Cocina {recipe.area}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
