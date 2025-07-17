"use client"

import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecipeCard } from "@/components/recipe-card"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchRandomRecipes } from "@/lib/features/recipes/recipeSlices"
import Link from "next/link"
import { useFavorites } from "@/hooks/useFavorites"

export default function FavoritesPage() {
  const dispatch = useAppDispatch()
  const { recipes, loading } = useAppSelector((state) => state.recipes)
  const { favoriteIds, getFavoritesCount } = useFavorites()

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRandomRecipes(20))
    }
  }, [dispatch, recipes.length])

  const favoriteRecipes = useMemo(() => {
    const unique: { [id: string]: boolean } = {};
    return recipes
      .filter((recipe) => favoriteIds.includes(recipe.id))
      .filter((recipe) => {
        if (unique[recipe.id]) return false;
        unique[recipe.id] = true;
        return true;
      });
  }, [recipes, favoriteIds]);
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleFavorites = favoriteRecipes.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Mis Recetas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Favoritas
            </span>
            ❤️
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Aquí tienes todas las recetas que has guardado para cocinar más tarde
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : favoriteRecipes.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              {getFavoritesCount()} receta{getFavoritesCount() !== 1 ? "s" : ""} guardada
              {getFavoritesCount() !== 1 ? "s" : ""} 🎉
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleFavorites.map((recipe, idx) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  priority={idx === 0}
                  blurDataURL={"/placeholder.svg"}
                />
              ))}
            </div>
            {favoriteRecipes.length > visibleCount && (
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
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Aún no tienes favoritas!</h3>
            <p className="text-gray-600 mb-6">
              Explora nuestras deliciosas recetas y guarda las que más te gusten haciendo clic en el corazón
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-medium rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all"
            >
              Descubrir Recetas 🍳
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
