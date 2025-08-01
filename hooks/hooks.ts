import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
