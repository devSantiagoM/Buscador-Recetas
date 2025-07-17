import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FiltersState {
  selectedCategories: string[]
  selectedTags: string[]
}

const initialState: FiltersState = {
  selectedCategories: [],
  selectedTags: [],
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload
      const index = state.selectedCategories.indexOf(category)

      if (index >= 0) {
        state.selectedCategories.splice(index, 1)
      } else {
        state.selectedCategories.push(category)
      }
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload
      const index = state.selectedTags.indexOf(tag)

      if (index >= 0) {
        state.selectedTags.splice(index, 1)
      } else {
        state.selectedTags.push(tag)
      }
    },
    clearFilters: (state) => {
      state.selectedCategories = []
      state.selectedTags = []
    },
  },
})

export const { toggleCategory, toggleTag, clearFilters } = filtersSlice.actions
export default filtersSlice.reducer
