import { type ApiMeal, type Recipe, categories } from "@/lib/types"
import axiosInstance from "@/api/axiosInstance"
import { validateSearch } from "@/lib/validation"


// Transform API meal to our Recipe format
export const transformMeal = (meal: ApiMeal): Recipe => {
  const ingredients: string[] = []

  // Extract ingredients and measurements
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof ApiMeal] as string
    const measure = meal[`strMeasure${i}` as keyof ApiMeal] as string

    if (ingredient && ingredient.trim()) {
      const fullIngredient = measure && measure.trim() ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim()
      ingredients.push(fullIngredient)
    }
  }

  // Split instructions into steps
  const instructions = meal.strInstructions
    .split(/\r\n|\r|\n/)
    .filter((step) => step.trim().length > 0)
    .map((step) => step.trim())

  // Map category to our format
  const categoryMapping = categories.find((cat) => cat.apiName === meal.strCategory)
  const category = categoryMapping ? categoryMapping.name : "Almuerzo"

  // Generate tags based on category and area
  const tags: string[] = []
  if (meal.strArea) tags.push(meal.strArea)
  if (meal.strCategory === "Vegetarian") tags.push("Vegetariano")
  if (meal.strCategory === "Vegan") tags.push("Vegano")
  if (meal.strCategory === "Dessert") tags.push("Dulce")
  if (meal.strCategory === "Breakfast") tags.push("Rápido")
  tags.push("Casero")

  // Estimate difficulty based on number of ingredients
  let difficulty: "Fácil" | "Medio" | "Difícil" = "Fácil"
  if (ingredients.length > 10) difficulty = "Medio"
  if (ingredients.length > 15) difficulty = "Difícil"

  // Estimate cooking time based on instructions length
  const instructionLength = meal.strInstructions.length
  let time = "15 min"
  if (instructionLength > 500) time = "30 min"
  if (instructionLength > 1000) time = "45 min"
  if (instructionLength > 1500) time = "60 min"

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category,
    time,
    servings: 4, // Default servings
    difficulty,
    rating: Math.round((Math.random() * 1 + 4) * 10) / 10, // Random rating between 4.0-5.0
    image: meal.strMealThumb,
    description: `Deliciosa receta de ${meal.strMeal.toLowerCase()} con auténtico sabor ${meal.strArea?.toLowerCase() || "casero"}`,
    tags,
    ingredients,
    instructions,
    nutrition: {
      calories: Math.floor(Math.random() * 200 + 250), // Random calories 250-450
      protein: `${Math.floor(Math.random() * 20 + 15)}g`,
      carbs: `${Math.floor(Math.random() * 30 + 25)}g`,
      fat: `${Math.floor(Math.random() * 15 + 10)}g`,
    },
    author: `Chef ${meal.strArea || "Internacional"}`,
    prepTime: "10 min",
    cookTime: time,
    area: meal.strArea || "Internacional",
    youtube: meal.strYoutube,
  }
}

export const api = {
  // Search recipes by name
  searchRecipes: async (query: string): Promise<Recipe[]> => {
    try {
      // Validación optimizada con Zod
      const validation = validateSearch(query);
      if (!validation.success || !validation.data) {
        console.warn('Búsqueda potencialmente peligrosa bloqueada:', query);
        return [];
      }
      
      const response = await axiosInstance.get(`/search.php?s=${encodeURIComponent(validation.data)}`)
      const data = response.data

      if (data.meals) {
        return data.meals.map(transformMeal)
      }
      return []
    } catch (error) {
      console.error("Error searching recipes:", error)
      return []
    }
  },

  // Get recipes by category
  getRecipesByCategory: async (category: string): Promise<Recipe[]> => {
    try {
      const response = await axiosInstance.get(`/filter.php?c=${category}`)
      const data = response.data

      if (data.meals) {
        // Get detailed info for each meal
        const detailedMeals = await Promise.all(
          data.meals.slice(0, 12).map(async (meal: { idMeal: string }) => {
            const detailResponse = await axiosInstance.get(`/lookup.php?i=${meal.idMeal}`)
            const detailData = detailResponse.data
            return detailData.meals?.[0]
          }),
        )

        return detailedMeals.filter(Boolean).map(transformMeal)
      }
      return []
    } catch (error) {
      console.error("Error fetching recipes by category:", error)
      return []
    }
  },

  // Get recipe by ID
  getRecipeById: async (id: string): Promise<Recipe | null> => {
    try {
      const response = await axiosInstance.get(`/lookup.php?i=${id}`)
      const data = response.data

      if (data.meals && data.meals[0]) {
        return transformMeal(data.meals[0])
      }
      return null
    } catch (error) {
      console.error("Error fetching recipe by ID:", error)
      return null
    }
  },

  // Get random recipes
  getRandomRecipes: async (count = 12): Promise<Recipe[]> => {
    try {
      const promises = Array(count)
        .fill(null)
        .map(() => axiosInstance.get(`/random.php`).then((res) => res.data))

      const results = await Promise.all(promises)
      const meals = results.filter((result) => result.meals && result.meals[0]).map((result) => result.meals[0])

      return meals.map(transformMeal)
    } catch (error) {
      console.error("Error fetching random recipes:", error)
      return []
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await axiosInstance.get(`/categories.php`)
      const data = response.data
      return data.categories || []
    } catch (error) {
      console.error("Error fetching categories:", error)
      return []
    }
  },
}
