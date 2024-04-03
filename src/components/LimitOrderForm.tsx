import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { ButtonBuy, ButtonSell } from "./styles/ButtonStyled";
import { FieldSetStyled, LegendStyled, InputContainer, ButtonContainer } from "./BuyOrderForm";
import InputField from "./InputField";
import TextField from "./TextField";

import { addBuyOrder, reduceBuyOrder, filterBuyOrderList } from "../features/orders/buyOrderListSlice";
import { addSellOrder, reduceSellOrder, filterSellOrderList } from "../features/orders/sellOrderListSlice";
import { setPrice, setLimit, setQuantity, setTotal, resetLimitOrder } from "../features/orders/limitOrderSlice";
import { addToHistory } from "../features/history/historySlice";
import { RootState } from "../app/store";


const LimitFormStyled = styled.form`
  grid-area: limitForm;
`;


type LimitBuy = {
  id: string,
  pair: string,
  date: Date,
  type: string,
  price: number,
  limit: number,
  quantity: number,
  total: number
}


type LimitSell = {
  id: string,
  pair: string,
  date: Date,
  type: string,
  price: number,
  limit: number,
  quantity: number,
  total: number
}


export default function LimitOrderForm() {

  const price = useSelector((state: RootState) => state.limitOrder.price);
  const limit = useSelector((state: RootState) => state.limitOrder.limit);
  const quantity = useSelector((state: RootState) => state.limitOrder.quantity);
  const total = useSelector((state: RootState) => state.limitOrder.total);

  const [ priceError, setPriceError ] = useState("");
  const [ quantityError, setQuantityError ] = useState("");
  const [ limitError, setLimitError ] = useState("");

  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const pair = `${currencyBase}${currencyQuote}`;
  // @ts-expect-error root state indexed  
  const buyOrders = useSelector((state: RootState) => state.buyOrderList.orders[pair].buyOrders);
  // @ts-expect-error root state indexed
  const sellOrders = useSelector((state: RootState) => state.sellOrderList.orders[pair].sellOrders);

  const dispatch = useDispatch();


  // calculate total. check for valid division
  useEffect(() => {
    const limitValue = parseFloat(limit) || 0;
    const priceValue = limitValue || parseFloat(price);
    const res = parseFloat(quantity) / priceValue;

    if(!isNaN(res) && priceValue !== 0 ) {
      dispatch(setTotal(res.toFixed(2)));
    } else {
      dispatch(setTotal(""));
    }
  }, [price, limit, quantity, dispatch]);

  // reset price or limit error on valid price or limit input
  useEffect(() => {
    const noEmptyStrings = price !== "" || limit !== "";
    const noErrors = priceError !== "" || limitError !== "";

    const priceValue = parseFloat(price);
    const limitValue = parseFloat(limit);
    const validNumbers = (!isNaN(priceValue) && priceValue !== 0) || (!isNaN(limitValue) && limitValue !== 0);
    if(noEmptyStrings && noErrors && validNumbers) {
      setPriceError("");
      setLimitError("");
    }
  }, [price, limit, priceError, limitError]);


  const checkInput = (quantity: number, price: number, limit: number) => {
    // check quantity input
    if(!quantity) {
      setQuantityError("Enter quantity");
      dispatch(setTotal(""));
      return false;
    }

    // check price and limit input
    if(!price && !limit) {
      setPriceError("Enter price or limit");
      setLimitError("Enter price or limit");
      dispatch(setTotal(""));
      return false;
    }

    return true;
  }    


  type Order = {id: string, pair: string, price: number, limit: number, quantity: number, total: number};

  const addOrder = (order: Order, type: string) => {
    if(type === "Buy") {
      dispatch(addBuyOrder(order));
    } else {
      dispatch(addSellOrder(order));
    }
    dispatch(resetLimitOrder());
    return;
  };


  type Record = {id: string, pair: string, date: number, type: string, price: number, quantity: number, total: number};
  
  const addHistoryRecord = (record: Record) => {
    dispatch(addToHistory(record));
    dispatch(resetLimitOrder());
    return;
  };


  const executeOrder = (idx: number, record: Record) => {
    if(record.type === "Buy") {
      dispatch(reduceSellOrder({idx, pair, buyQuantity: record.quantity, buyTotal: record.total}));
    } else {
      dispatch(reduceBuyOrder({idx, pair, sellQuantity: record.quantity, sellTotal: record.total}));
    }
    addHistoryRecord(record);
  };


  // check price order against sell orders
  // on price and initial quantity match - store sell order index and exit
  // on sufficient buy quantity - subtract from buy quantity
  // on insufficient buy quantity - check all the remaining orders for limit a order, if found - set 'executable' flag
  // on buy order completely fulfilled - set 'executable' flag
  const preMatchOrder = (price: number, quantity: number, orders: LimitBuy[] | LimitSell[], type: string) => {
    let i = 0;
    let matchIndex = -1;
    let isPriceOrderExecutable = false;
    let qtyLeft = quantity;
    const isPriceMatching = type === "Buy" ? ((a: number, b: number) => a >= b) : ((a: number, b: number) => a <= b);

    while(qtyLeft >= 0 && orders[i]) {
        if(isPriceMatching(price, orders[i].price)) {
        // initial quantity match
        if (quantity === orders[i].quantity) {
          matchIndex = i;
          break;
        }
        // for all non-matching orders
        if(qtyLeft >= orders[i].quantity) { // price orders
          qtyLeft -= orders[i].quantity;
        } else if(orders[i].limit && qtyLeft < orders[i].quantity) { // limit orders
          isPriceOrderExecutable = true;
        }
      }
      // order fulfilled
      if(qtyLeft === 0) {
        isPriceOrderExecutable = true;
      }

      ++i;
    }
    return {isPriceOrderExecutable, matchIndex};
  };


  const limitBuy = () => {
    const buyLimit = parseFloat(limit) || 0;
    const buyPrice = buyLimit ? buyLimit : parseFloat(price);
    let buyQuantity = parseFloat(quantity) || 0;
    let buyTotal = parseFloat(total) || 0;

    if(!checkInput(buyQuantity, buyPrice, buyLimit)) {
      return;
    }

    // if no sell orders - add buy order and exit
    if(!sellOrders.length) {
      const buyOrder = {id: uuidv4(), pair, price: buyPrice, limit: buyLimit, quantity: buyQuantity, total: buyTotal};
      addOrder(buyOrder, "Buy");
      return;
    }

    const { isPriceOrderExecutable, matchIndex } = preMatchOrder(buyPrice, buyQuantity, sellOrders, "Buy");

    // on match - execute, cleanup and exit
    if(matchIndex > -1) {
      const { price, quantity, total } = sellOrders[matchIndex];
      executeOrder(matchIndex, {id: uuidv4(), pair, date: Date.now(), type: "Buy", price, quantity, total});
      dispatch(filterSellOrderList({pair}));
      return;
    }


    // for all limit orders or 'executable price orders', where prices match
    const hasQuantityRemaining = sellOrders.every((sell: LimitSell, idx: number) => {

      if(buyPrice >= sell.price && (buyLimit || isPriceOrderExecutable)) {
        // for all executable orders (limit or price), execute with lesser quantity
        if(sell.limit || buyQuantity >= sell.quantity) {
          const qty = buyQuantity < sell.quantity ? buyQuantity : sell.quantity;
          const newTotal = parseFloat((qty / sell.price).toFixed(2));
          executeOrder(idx, {id: uuidv4(), pair, date: Date.now(), type: "Buy", price: sell.price, quantity: qty, total: newTotal});
          buyQuantity -= sell.quantity;
          if(buyQuantity <= 0) {
              return false;
          }
        }
      }
      return true;
    });


    dispatch(filterSellOrderList({pair}));

    if (hasQuantityRemaining) {
      buyTotal = parseFloat((buyQuantity / buyPrice).toFixed(2));
      dispatch(addBuyOrder({id: uuidv4(), pair, price: buyPrice, limit: buyLimit, quantity: buyQuantity, total: buyTotal}));
      dispatch(resetLimitOrder());      
      return;
    }
  }


  const limitSell = () => {
    const sellLimit = parseFloat(limit) || 0;
    const sellPrice = sellLimit ? sellLimit : parseFloat(price);
    let sellQuantity = parseFloat(quantity) || 0;
    let sellTotal = parseFloat(total) || 0;

    if(!checkInput(sellQuantity, sellPrice, sellLimit)) {
      return;
    }

    // if no buy orders - add sell order and exit
    if(!buyOrders.length) {
      const sellOrder = {id: uuidv4(), pair, price: sellPrice, limit: sellLimit, quantity: sellQuantity, total: sellTotal};
      addOrder(sellOrder, "Sell");
      return;
    }

    const { isPriceOrderExecutable, matchIndex } = preMatchOrder(sellPrice, sellQuantity, buyOrders, "Sell");

    // if match - execute, cleanup and exit
    if(matchIndex > -1) {
      const { price, quantity, total } = buyOrders[matchIndex];
      executeOrder(matchIndex, {id: uuidv4(), pair, date: Date.now(), type: "Sell", price, quantity, total});
      dispatch(filterBuyOrderList({pair}));
      return;
    }


    // for all limit orders or 'executable price orders', where prices match
    const hasQuantityRemaining = buyOrders.every((buy: LimitBuy, idx: number) => {

      if(sellPrice <= buy.price && (sellLimit || isPriceOrderExecutable)) {
        // for all executable orders (limit or price), execute with lesser quantity
        if(buy.limit || sellQuantity >= buy.quantity) {
          const qty = sellQuantity < buy.quantity ? sellQuantity : buy.quantity;
          const newTotal = parseFloat((qty / buy.price).toFixed(2));
          executeOrder(idx, {id: uuidv4(), pair, date: Date.now(), type: "Sell", price: buy.price, quantity: qty, total: newTotal});
          sellQuantity -= buy.quantity;
          if(sellQuantity <= 0) {
              return false;
          }
        }
      }
      return true;
    });


    dispatch(filterBuyOrderList({pair}));

    if (hasQuantityRemaining) {
      sellTotal = parseFloat((sellQuantity / sellPrice).toFixed(2));
      dispatch(addSellOrder({id: uuidv4(), pair, price: sellPrice, limit: sellLimit, quantity: sellQuantity, total: sellTotal}));
      dispatch(resetLimitOrder());
      return;
    }
  }


  return (
      <LimitFormStyled>
        <FieldSetStyled>
          <LegendStyled>Limit Order</LegendStyled>
          <InputContainer>
        {/* @ts-expect-error styled component types */}
            <InputField type="limit-price" label="Price" inputValue={price} currency={currencyBase} setValue={setPrice} setError={setPriceError} error={priceError} />
        {/* @ts-expect-error styled component types */}
            <InputField type="limit-limit" label="Limit" inputValue={limit} currency={currencyBase} setValue={setLimit} setError={setLimitError} error={limitError} />
        {/* @ts-expect-error styled component types */}
            <InputField type="limit-quantity" label="Quantity" inputValue={quantity} currency={currencyQuote} setValue={setQuantity} setError={setQuantityError} error={quantityError} />
            <TextField type="limit-total" label="Total" inputValue={total} currency={currencyBase} />
            <ButtonContainer>
        {/* @ts-expect-error styled component types */}
              <ButtonBuy type="button" onClick={limitBuy}>BUY</ButtonBuy>
        {/* @ts-expect-error styled component types */}
              <ButtonSell type="button" onClick={limitSell}>SELL</ButtonSell>
            </ButtonContainer>
          </InputContainer>
        </FieldSetStyled>
      </LimitFormStyled>
  );
}
