import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { api } from "@/api/api"
import type { Recipe } from "@/lib/types"

interface RecipesState {
  recipes: Recipe[]
  currentRecipe: Recipe | null
  loading: boolean
  error: string | null
  searchTerm: string
  hasSearched: boolean
}

const initialState: RecipesState = {
  recipes: [],
  currentRecipe: null,
  loading: false,
  error: null,
  searchTerm: "",
  hasSearched: false,
}

// Async thunks
export const fetchRandomRecipes = createAsyncThunk(
  "recipes/fetchRandom",
  async (count?: number) => {
    return await api.getRandomRecipes(count ?? 12)
  }
)

export const searchRecipes = createAsyncThunk("recipes/search", async (query: string) => {
  return await api.searchRecipes(query)
})

export const fetchRecipesByCategory = createAsyncThunk("recipes/fetchByCategory", async (category: string) => {
  return await api.getRecipesByCategory(category)
})

export const fetchRecipeById = createAsyncThunk("recipes/fetchById", async (id: string) => {
  return await api.getRecipeById(id)
})

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch random recipes
      .addCase(fetchRandomRecipes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRandomRecipes.fulfilled, (state, action) => {
        state.loading = false
        // Filtrar recetas duplicadas por id
        const unique: { [id: string]: boolean } = {};
        state.recipes = action.payload.filter((recipe: Recipe) => {
          if (unique[recipe.id]) return false;
          unique[recipe.id] = true;
          return true;
        });
        state.hasSearched = false
      })
      .addCase(fetchRandomRecipes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error fetching recipes"
      })

      // Search recipes
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.loading = false
        // Filtrar recetas duplicadas por id
        const unique: { [id: string]: boolean } = {};
        state.recipes = action.payload.filter((recipe: Recipe) => {
          if (unique[recipe.id]) return false;
          unique[recipe.id] = true;
          return true;
        });
        state.hasSearched = true
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error searching recipes"
      })

      // Fetch by category
      .addCase(fetchRecipesByCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecipesByCategory.fulfilled, (state, action) => {
        state.loading = false
        // Filtrar recetas duplicadas por id
        const unique: { [id: string]: boolean } = {};
        state.recipes = action.payload.filter((recipe: Recipe) => {
          if (unique[recipe.id]) return false;
          unique[recipe.id] = true;
          return true;
        });
        state.hasSearched = true
      })
      .addCase(fetchRecipesByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error fetching recipes by category"
      })

      // Fetch by ID
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false
        state.currentRecipe = action.payload
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error fetching recipe"
      })
  },
})

export const { setSearchTerm, clearCurrentRecipe, clearError } = recipesSlice.actions
export default recipesSlice.reducer
