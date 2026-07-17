import { configureStore } from "@reduxjs/toolkit";
import statsReducer from "./statsSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

const store = configureStore({
  reducer: {
    stats: statsReducer,
  },
});

export default store;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector as TypedUseSelectorHook<RootStateType>;