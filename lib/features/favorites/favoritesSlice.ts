import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FavoritesState {
  favoriteIds: string[]
}

const initialState: FavoritesState = {
  favoriteIds: [],
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.favoriteIds.indexOf(id)

      if (index >= 0) {
        state.favoriteIds.splice(index, 1)
      } else {
        state.favoriteIds.push(id)
      }
    },
    loadFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoriteIds = action.payload
    },
  },
})

export const { toggleFavorite, loadFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
