"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { FavoritesProvider } from "@/context/FavoritesContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </Provider>
  )
}
