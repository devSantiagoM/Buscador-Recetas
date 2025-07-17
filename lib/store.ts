import { configureStore } from "@reduxjs/toolkit"
import recipesReducer from "@/lib/features/recipes/recipeSlices"
import favoritesReducer from "@/lib/features/favorites/favoritesSlice"
import filtersReducer from "./features/filters/filtersSlice"

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
