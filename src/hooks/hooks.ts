import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../storage/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// создаем собственный хук useAppDispatch на основе базового useDispatch,
// чтобы ts ожидал dispatch не только action, но и thunk
export const useAppDispatch = () => useDispatch<AppDispatch>();
