import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { RootState } from "../app/store";

import InputField from "./InputField";
import TextField from "./TextField";
import { ButtonBuy } from "./styles/ButtonStyled";
import { setPrice, setQuantity, setTotal, setBuyOrder } from "../features/orders/buyOrderSlice";
import { removeSellOrder, reduceSellQuantity } from "../features/orders/sellOrderListSlice";
import { addToHistory } from "../features/history/historySlice";


const BuyFormStyled = styled.form`
  grid-area: buyForm;
`;


export const FieldSetStyled = styled.fieldset`
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #555;
  border-radius: 0.3rem;
  margin: 0;
  padding: 0.3rem 0.3rem;
`;


export const LegendStyled = styled.legend`
  font-size: 1.1rem;
  margin: 0.3rem auto;
  font-weight: 600;
  padding: 0 0.5rem;
`;


export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
`;


export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;


type Sell = {
  id: string,
  pair: string,
  date: Date,
  type: string,
  price: number,
  quantity: number,
  total: number
}


const BuyOrderForm: React.FC = () => {
  const price = useSelector((state: RootState) => state.buyOrder.price);
  const quantity = useSelector((state: RootState) => state.buyOrder.quantity);
  const total = useSelector((state: RootState) => state.buyOrder.total);

  const [ priceError, setPriceError ] = useState("");
  const [ quantityError, setQuantityError ] = useState("");

  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const pair = `${currencyBase}${currencyQuote}`;
  const sellOrders = useSelector((state: RootState) => state.sellOrderList.orders[pair as keyof typeof state.sellOrderList.orders].sellOrders);
  
  const dispatch = useDispatch();

  // calculate total. check for valid division
  useEffect(() => {
    const priceValue = parseFloat(price);
    const res = parseFloat(quantity) / priceValue;
    if(!isNaN(res) && priceValue !== 0 ) {
      dispatch(setTotal(res.toFixed(2)));
    } else {
      dispatch(setTotal(""));
    }
  }, [price, quantity, dispatch]);


  useEffect(() => {
    const regex = /^\d*\.?\d{0,2}$/;

    if(!regex.test(price)) {
      setPriceError("Enter a number with up to two decimal places");
    } else {
      // setPriceError("");
    }
  }, [price, priceError]);


  const checkInput = (buyQuantity: number, buyPrice: number) => {
    // check quantity input
    if(!buyQuantity) {
      const errorQuantity = (buyQuantity === 0) ? "Quantity must be a non-zero number" : "Enter quantity";
      setQuantityError(errorQuantity);
      dispatch(setTotal(""));
      return false;
    }
    
    // check price input
    if(!buyPrice) {
      const errorPrice = (buyPrice === 0) ? "Price must be a non-zero number" : "Enter price";
      setPriceError(errorPrice);
      dispatch(setTotal(""));
      return false;
    }
    
    return true;
  };


  const marketBuy = () => {
    const id = uuidv4();
    const buyPrice = parseFloat(price);
    const buyQuantity = parseFloat(quantity);
    const buyTotal = parseFloat(total);

    if(!checkInput(buyQuantity, buyPrice)) {
      return;
    }

    const match = sellOrders.some((sell: Sell, idx: number) => {
      if(buyPrice !== sell.price) {
        return false;
      }
      if(buyQuantity > sell.quantity) {
        setQuantityError("The requested quantity exceeds the available supply at this price");
      } else {
        if(buyQuantity < sell.quantity) {
          // execute order for required quantity (send api request)
          dispatch(reduceSellQuantity({idx, buyQuantity, pair}));
        } else if (buyQuantity === sell.quantity){
          // execute immediately (send api request)
          dispatch(removeSellOrder({idx, pair}));
        }
        // add to history
        dispatch(addToHistory({
          id,
          pair,
          date: Date.now(),
          type: "Buy",
          price: buyPrice,
          quantity: buyQuantity,
          total: buyTotal,
        }));
        dispatch(setBuyOrder({price: "", quantity: "", total: ""}));
      }
      return true;
    });
    
    if(!match) {
      setPriceError("No sell orders available at this price");
    }
  };


  return (
    <BuyFormStyled>
      <FieldSetStyled>
        <LegendStyled>Buy {currencyBase}</LegendStyled>
        <InputContainer>
        {/* @ts-expect-error styled component types */}
          <InputField type="buy-price" label="Price" inputValue={price} currency={currencyBase} setValue={setPrice} setError={setPriceError} error={priceError} />
          {/* <InputField type="buy-price" label="Price" inputValue={price} currency={currencyBase} setValue={(price: string) => dispatch(setPrice(price))} setError={setPriceError} error={priceError} /> */}
        {/* @ts-expect-error styled component types */}
          <InputField type="buy-quantity" label="Quantity" inputValue={quantity} currency={currencyQuote} setValue={setQuantity} setError={setQuantityError} error={quantityError} />
          <TextField type="buy-total" label="Total" inputValue={total} currency={currencyBase} />
          <ButtonContainer>
        {/* @ts-expect-error styled component types */}
            <ButtonBuy type="button" onClick={marketBuy}>BUY</ButtonBuy>
          </ButtonContainer>
        </InputContainer>
      </FieldSetStyled>
    </BuyFormStyled>
  );
};

export default BuyOrderForm;
