import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import InputField from "./InputField";
import { ButtonBuy, ButtonSell } from "./styles/ButtonStyled";
import { FormStyled, FieldSetStyled, LegendStyled, InputContainer, ButtonContainer } from "./BuyOrderForm";
import inputAttrs from "../app/inputAttrs";

import { addBuyOrder, reduceBuyOrder, filterBuyOrderList } from "../features/orders/buyOrderListSlice";
import { addSellOrder, reduceSellOrder, filterSellOrderList } from "../features/orders/sellOrderListSlice";
import { setLimitOrder, resetLimitOrder } from "../features/orders/limitOrderSlice";
import { addToHistory } from "../features/history/historySlice";
import { RootState } from "../app/store";


const LimitFormStyled = styled(FormStyled)`
  grid-area: limitForm;
`;


const LimitOrderForm = () => {
  
  const values: LimitFormInput = useSelector((state: RootState) => state.limitOrder);

  const [ errorMsgs, setErrorMsgs ] = useState({
    priceError: "",
    limitError: "",
    quantityError: "",
    totalError: "",
  });

  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const pair = `${currencyBase}${currencyQuote}`;
  const buyOrders = useSelector((state: RootState) => state.buyOrderList.orders[pair as keyof typeof state.buyOrderList.orders].buyOrders);
  const sellOrders = useSelector((state: RootState) => state.sellOrderList.orders[pair as keyof typeof state.sellOrderList.orders].sellOrders);

  const dispatch = useDispatch();


  // calculate and set total
  useEffect(() => {
    const priceValue = parseFloat(values.limit) || parseFloat(values.price) || 0;
    const quantityValue =  parseFloat(values.quantity) || 0;
    let newTotal = "";
    if(priceValue > 0 && quantityValue > 0) {
      newTotal = (quantityValue / priceValue).toFixed(2);
    }
    dispatch(setLimitOrder({...values, total: newTotal}));
  }, [values, dispatch]);


  const resetErrors = () => {
    setErrorMsgs({priceError: "", limitError: "", quantityError: "", totalError: ""});
  };


  const handleFormBlur = () => {
    resetErrors();
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const userInput = e.target.value;
    const decimals = /^\d*\.?\d{0,2}$/;
    const number = /^[0-9]*$/;
    const errorKey = `${field}Error`;

    // value is 0 and first char is a number - replace with a new number
    if(values[field as keyof typeof values] === "0" && number.test(userInput[userInput.length - 1])) {
      dispatch(setLimitOrder({...values, [field]: userInput[userInput.length - 1]}));
    }
    // value is empty and first char is not a number
    else if(values[field as keyof typeof values] === "" && !number.test(userInput[userInput.length - 1])) {
      setErrorMsgs({...errorMsgs, [errorKey]: "Enter a number with up to two decimal places"});
    }
    // value is valid
    else if(decimals.test(userInput)) {
      setErrorMsgs({...errorMsgs, [errorKey]: ""});
      dispatch(setLimitOrder({...values, [field]: userInput}));
    }
  };


  const checkInput = (price: number, limit: number, quantity: number) => {
    // check price and limit input
    if(price <= 0 && limit <= 0) {
      setErrorMsgs({...errorMsgs, priceError: "Enter price or limit", limitError: "Enter price or limit"});
      return false;
    }
    // check quantity input
    if(quantity <= 0) {
      setErrorMsgs({...errorMsgs, quantityError: "Enter quantity"});
      return false;
    }

    return true;
  };


  const addOrder = (order: LimitOrder, type: string) => {
    if(type === "Buy") {
      dispatch(addBuyOrder(order));
    } else {
      dispatch(addSellOrder(order));
    }
    dispatch(resetLimitOrder());
    return;
  };


  const addHistoryRecord = (record: HistoryRecord) => {
    dispatch(addToHistory(record));
    dispatch(resetLimitOrder());
    return;
  };


  const executeOrder = (idx: number, record: HistoryRecord) => {
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
    const isPriceMatching = (type === "Buy") ? ((a: number, b: number) => a >= b) : ((a: number, b: number) => a <= b);

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
    const buyLimit = parseFloat(values.limit) || 0;
    const buyPrice = buyLimit ? buyLimit : parseFloat(values.price) || 0;
    let buyQuantity = parseFloat(values.quantity) || 0;
    let buyTotal = parseFloat(values.total) || 0;

    if(!checkInput(buyPrice, buyLimit, buyQuantity)) {
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
    const sellLimit = parseFloat(values.limit) || 0;
    const sellPrice = sellLimit ? sellLimit : parseFloat(values.price) || 0;
    let sellQuantity = parseFloat(values.quantity) || 0;
    let sellTotal = parseFloat(values.total) || 0;

    if(!checkInput(sellPrice, sellLimit, sellQuantity)) {
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
    <LimitFormStyled id="limit-form" onBlur={() => handleFormBlur()}>
      <FieldSetStyled name="form-fieldset">
        <LegendStyled>Limit Order</LegendStyled>
        <InputContainer>
          {
            inputAttrs.map((input) => {
              return <InputField
                key={input.name}
                id={`${input.form}-${input.name}`}
                {...input}
                value={values[input.name as keyof typeof values]}
                currency={input.name === "quantity" ? currencyQuote : currencyBase}
                errorMsg={errorMsgs[input.errorMsg as keyof typeof errorMsgs]}
                onChange={handleChange}
                autoComplete="off"
                />;          
            })
          }
          <ButtonContainer>
            {/* @ts-expect-error styled component types */}
            <ButtonBuy id="limit-form-buy-button" type="button" name="buy-button" onClick={limitBuy}>BUY</ButtonBuy>
            {/* @ts-expect-error styled component types */}
            <ButtonSell id="limit-form-sell-button" type="button" name="sell-button" onClick={limitSell}>SELL</ButtonSell>
          </ButtonContainer>
        </InputContainer>
      </FieldSetStyled>
    </LimitFormStyled>
  );
};


export default LimitOrderForm;