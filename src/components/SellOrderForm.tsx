import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { ButtonSell } from "./styles/ButtonStyled";
import { FormStyled, FieldSetStyled, LegendStyled, InputContainer, ButtonContainer } from "./BuyOrderForm";
import InputField from "./InputField";
import TextField from "./TextField";

import { setPrice, setQuantity, setTotal, setSellOrder } from "../features/orders/sellOrderSlice";
import { removeBuyOrder, reduceBuyQuantity } from "../features/orders/buyOrderListSlice";
import { addToHistory } from "../features/history/historySlice";
import { RootState } from "../app/store";


const SellFormStyled = styled(FormStyled)`
  grid-area: sellForm;
`;


type Buy = {
  id: string,
  pair: string,
  date: Date,
  type: string,
  price: number,
  quantity: number,
  total: number
}


export default function SellOrderForm() {
  
  const price = useSelector((state: RootState) => state.sellOrder.price);
  const quantity = useSelector((state: RootState) => state.sellOrder.quantity);
  const total = useSelector((state: RootState) => state.sellOrder.total);

  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const pair = `${currencyBase}${currencyQuote}`;
  const buyOrders = useSelector((state: RootState) => state.buyOrderList.orders[pair as keyof typeof state.buyOrderList.orders].buyOrders);

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


  const checkInput = (sellQuantity: number, sellPrice: number) => {
    // check quantity input
    if(!sellQuantity) {
      const errorQuantity = sellQuantity === 0 ? "Quantity must be a non-zero number" : "Enter quantity";
      setQuantityError(errorQuantity);
      dispatch(setTotal(""));
      return false;
    }
    
    // check price input
    if(!sellPrice) {
      const errorPrice = sellPrice === 0 ? "Price must be a non-zero number" : "Enter price";
      setPriceError(errorPrice);
      dispatch(setTotal(""));
      return false;
    }
    
    return true;
  }   


  const marketSell = () => {
    const id = uuidv4();
    const sellPrice = parseFloat(price);
    const sellQuantity = parseFloat(quantity);
    const sellTotal = parseFloat(total);

    if(!checkInput(sellQuantity, sellPrice)) {
      return;
    }

    const match = buyOrders.some((buy: Buy, idx: number) => {
      if(sellPrice !== buy.price) {
        return false;
      }
      if(sellQuantity > buy.quantity) {
        setQuantityError("The requested quantity exceeds the available supply at this price");
      } else {
        if(sellQuantity < buy.quantity) {
          // execute order for required quantity (send api request)
          dispatch(reduceBuyQuantity({idx, sellQuantity, pair}));
        } else if (sellQuantity === buy.quantity){
          // execute immediately (send api request)
          dispatch(removeBuyOrder({idx, pair}));
        }
        // add to history
        dispatch(addToHistory({
          id,
          pair,
          date: Date.now(),
          type: "Sell",
          price: sellPrice,
          quantity: sellQuantity,
          total: sellTotal,
        }));
        dispatch(setSellOrder({price: "", quantity: "", total: ""}));
      }
      return true;
    });

    if(!match) {
      setPriceError("No buy orders available at this price");
    }

  };


  return (
    <SellFormStyled>
      <FieldSetStyled>
        <LegendStyled>Sell {currencyBase}</LegendStyled>
        <InputContainer>
        {/* @ts-expect-error styled component types */}
          <InputField type="sell-price" label="Price" inputValue={price} currency={currencyBase} setValue={setPrice} setError={setPriceError} error={priceError} />
        {/* @ts-expect-error styled component types */}
          <InputField type="sell-quantity" label="Quantity" inputValue={quantity} currency={currencyQuote} setValue={setQuantity} setError={setQuantityError} error={quantityError} />
          <TextField type="sell-total" label="Total" inputValue={total} currency={currencyBase} />
          <ButtonContainer>
        {/* @ts-expect-error styled component types */}
            <ButtonSell type="button" onClick={marketSell}>SELL</ButtonSell>
          </ButtonContainer>
        </InputContainer>
      </FieldSetStyled>
    </SellFormStyled>
  );
}
