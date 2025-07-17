"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecipeCard } from "@/components/recipe-card"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  fetchRandomRecipes,
  searchRecipes,
  fetchRecipesByCategory,
  setSearchTerm,
} from "@/lib/features/recipes/recipeSlices"
import { toggleCategory, toggleTag } from "@/lib/features/filters/filtersSlice"
import { categories } from "@/lib/types"

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { recipes, loading, searchTerm, hasSearched } = useAppSelector((state) => state.recipes)
  const { selectedCategories, selectedTags } = useAppSelector((state) => state.filters)
  // Load initial recipes
  useEffect(() => {
    if (recipes.length === 0 && !hasSearched) {
      dispatch(fetchRandomRecipes(12))
    }
  }, [dispatch, recipes.length, hasSearched])

  // Handle search
  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value))
    if (value.trim()) {
      dispatch(searchRecipes(value.trim()))
    } else {
      dispatch(fetchRandomRecipes(12))
    }
  }

  // Handle category selection
  const handleCategoryToggle = (categoryName: string) => {
    dispatch(toggleCategory(categoryName))

    const category = categories.find((cat) => cat.name === categoryName)
    if (category && !selectedCategories.includes(categoryName)) {
      // If selecting a category, fetch recipes for that category
      dispatch(fetchRecipesByCategory(category.apiName))
    } else if (selectedCategories.length === 1 && selectedCategories.includes(categoryName)) {
      // If deselecting the last category, fetch random recipes
      dispatch(fetchRandomRecipes(12))
    }
  }

  // Get all unique tags from current recipes
  const allTags = useMemo(() => {
    return Array.from(new Set(recipes.flatMap((recipe) => recipe.tags)))
  }, [recipes])

  // Filter recipes based on selected filters
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(recipe.category)
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => recipe.tags.includes(tag))
      return matchesCategory && matchesTags
    })
  }, [recipes, selectedCategories, selectedTags])

  const handleTagToggle = (tag: string) => {
    dispatch(toggleTag(tag))
  }

  const [visibleCount, setVisibleCount] = useState(6);
  const visibleRecipes = filteredRecipes.slice(0, visibleCount);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <Header />

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
                placeholder="¿Qué te apetece cocinar hoy? 🤔 (Presiona Enter para buscar)"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
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
                onClick={() => handleCategoryToggle(category.name)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all hover:scale-105 ${selectedCategories.includes(category.name)
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
          <h3 className="text-2xl font-bold text-gray-800">
            {loading ? "Cargando..." : `${filteredRecipes.length} recetas encontradas 🎉`}
          </h3>
          {allTags.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-orange-300 bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros {selectedTags.length > 0 && `(${selectedTags.length})`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-[90vw] max-h-[60vh] overflow-y-auto">
                {allTags.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Recipe Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : filteredRecipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleRecipes.map((recipe, idx) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  priority={idx === 0}
                  blurDataURL={"/placeholder.svg"}
                />
              ))}
            </div>
            {recipes.length > visibleCount && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount(visibleCount + 6)}
                  className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-medium rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all shadow-md"
                >
                  Ver más recetas
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤷‍♀️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Ups! No encontramos recetas</h3>
            <p className="text-gray-600">Prueba con otros términos de búsqueda o categorías diferentes</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
