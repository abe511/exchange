import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../app/tempDB";


const initialState = {
  orders: data[0]
};


export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      // @ts-expect-error slice type
      state.orders[action.payload.pair].history.data.push(action.payload);
      const dataPointsLimit = 10;
      // @ts-expect-error slice type
      const graph = state.orders[action.payload.pair].history.timeseries[action.payload.type];
      graph.push({x: action.payload.date, y: action.payload.price});
      if(graph.length > dataPointsLimit) {
        graph.shift();
      }
    },
  }
});


export const { addToHistory } = historySlice.actions;

export default historySlice.reducer;
