import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../app/tempDB";


const initialState = {
  orders: data[0]
};


export const buyOrderListSlice = createSlice({
  name: "buyOrderList",
  initialState,
  reducers: {
    addBuyOrder: (state, action) => {
      // @ts-expect-error slice type
      const isAdded = state.orders[action.payload.pair].buyOrders.some((el, idx: number) => {
        if (action.payload.price > el.price) {
      // @ts-expect-error slice type
          state.orders[action.payload.pair].buyOrders.splice(idx, 0, action.payload);
          return true;
        }
      });
      if(!isAdded)
      // @ts-expect-error slice type
        state.orders[action.payload.pair].buyOrders.push(action.payload);
    },
    removeBuyOrder: (state, action) => {
      // @ts-expect-error slice type
      state.orders[action.payload.pair].buyOrders.splice(action.payload.idx, 1);
    },
    filterBuyOrderList: (state, action) => {
      // @ts-expect-error slice type
      state.orders[action.payload.pair].buyOrders = state.orders[action.payload.pair].buyOrders.filter((el) => el.quantity > 0);
    },
    reduceBuyQuantity: (state, action) => {
      // @ts-expect-error slice type
      state.orders[action.payload.pair].buyOrders[action.payload.idx].quantity -= action.payload.sellQuantity;
      // @ts-expect-error slice type
      const newTotal = parseFloat((state.orders[action.payload.pair].buyOrders[action.payload.idx].total - action.payload.sellTotal).toFixed(2));
      // @ts-expect-error slice type
      state.orders[action.payload.pair].buyOrders[action.payload.idx].total = newTotal;
    },
    reduceBuyOrder: (state, action) => {
      // @ts-expect-error slice type
      const order = state.orders[action.payload.pair].buyOrders[action.payload.idx];
      const newTotal = parseFloat((order.total - action.payload.sellTotal).toFixed(2));
      order.quantity -= action.payload.sellQuantity;
      order.total = newTotal;
    }
  }
});


export const { addBuyOrder, removeBuyOrder, reduceBuyQuantity, reduceBuyOrder, filterBuyOrderList } = buyOrderListSlice.actions;

export default buyOrderListSlice.reducer;
