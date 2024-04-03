import { configureStore } from "@reduxjs/toolkit";
import pairSelectorSlice from "../features/selector/pairSelectorSlice";
import buyOrderSlice from "../features/orders/buyOrderSlice";
import buyOrderListSlice from "../features/orders/buyOrderListSlice";
import sellOrderSlice from "../features/orders/sellOrderSlice";
import sellOrderListSlice from "../features/orders/sellOrderListSlice";
import limitOrderSlice from "../features/orders/limitOrderSlice";
import historySlice from "../features/history/historySlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    pairSelector: pairSelectorSlice,
    buyOrder: buyOrderSlice, 
    buyOrderList: buyOrderListSlice,
    sellOrder: sellOrderSlice,
    sellOrderList: sellOrderListSlice,
    limitOrder: limitOrderSlice, 
    history: historySlice,
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();


export default store;