export interface Recipe {
  id: string
  title: string
  category: string
  time: string
  servings: number
  difficulty: "Fácil" | "Medio" | "Difícil"
  rating: number
  image: string
  description: string
  tags: string[]
  ingredients: string[]
  instructions: string[]
  nutrition: {
    calories: number
    protein: string
    carbs: string
    fat: string
  }
  author: string
  prepTime: string
  cookTime: string
  area: string
  youtube?: string
}

export interface ApiMeal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strYoutube?: string
  strIngredient1?: string
  strIngredient2?: string
  strIngredient3?: string
  strIngredient4?: string
  strIngredient5?: string
  strIngredient6?: string
  strIngredient7?: string
  strIngredient8?: string
  strIngredient9?: string
  strIngredient10?: string
  strIngredient11?: string
  strIngredient12?: string
  strIngredient13?: string
  strIngredient14?: string
  strIngredient15?: string
  strIngredient16?: string
  strIngredient17?: string
  strIngredient18?: string
  strIngredient19?: string
  strIngredient20?: string
  strMeasure1?: string
  strMeasure2?: string
  strMeasure3?: string
  strMeasure4?: string
  strMeasure5?: string
  strMeasure6?: string
  strMeasure7?: string
  strMeasure8?: string
  strMeasure9?: string
  strMeasure10?: string
  strMeasure11?: string
  strMeasure12?: string
  strMeasure13?: string
  strMeasure14?: string
  strMeasure15?: string
  strMeasure16?: string
  strMeasure17?: string
  strMeasure18?: string
  strMeasure19?: string
  strMeasure20?: string
}

export const categories = [
  { name: "Desayuno", emoji: "🥞", color: "bg-orange-100 text-orange-800", apiName: "Breakfast" },
  { name: "Almuerzo", emoji: "🍽️", color: "bg-green-100 text-green-800", apiName: "Chicken" },
  { name: "Cena", emoji: "🍖", color: "bg-purple-100 text-purple-800", apiName: "Beef" },
  { name: "Postres", emoji: "🍰", color: "bg-pink-100 text-pink-800", apiName: "Dessert" },
  { name: "Snacks", emoji: "🍿", color: "bg-yellow-100 text-yellow-800", apiName: "Side" },
  { name: "Bebidas", emoji: "🥤", color: "bg-blue-100 text-blue-800", apiName: "Starter" },
]
