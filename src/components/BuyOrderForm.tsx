import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import InputField from "./InputField";
import { ButtonBuy } from "./styles/ButtonStyled";
import inputAttrs from "../app/inputAttrs";

import { setBuyOrder } from "../features/orders/buyOrderSlice";
import { removeSellOrder, reduceSellQuantity } from "../features/orders/sellOrderListSlice";
import { addToHistory } from "../features/history/historySlice";
import { RootState } from "../app/store";

import { mediaQueries } from "./styles/mediaQueries";


export const FormStyled = styled.form`
  margin-top: 1rem;
`;

const BuyFormStyled = styled(FormStyled)`
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
  margin: 0 auto;
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
  margin-top: 0;
  ${mediaQueries("lg")`
    margin-top: auto;
  `};
`;


const BuyOrderForm: React.FC = () => {

  const values: FormInput = useSelector((state: RootState) => state.buyOrder);

  const [ errorMsgs, setErrorMsgs ] = useState({
    priceError: "",
    quantityError: "",
    totalError: "",
  });

  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const pair = `${currencyBase}${currencyQuote}`;
  const sellOrders = useSelector((state: RootState) => state.sellOrderList.orders[pair as keyof typeof state.sellOrderList.orders].sellOrders);
  
  const dispatch = useDispatch();

  // calculate and set total
  useEffect(() => {
    const priceValue = parseFloat(values.price) || 0;
    const quantityValue =  parseFloat(values.quantity) || 0;
    let newTotal = "";
    if(priceValue > 0 && quantityValue > 0) {
      newTotal = (quantityValue / priceValue).toFixed(2);
    }
    dispatch(setBuyOrder({...values, total: newTotal}));
  }, [values, dispatch]);


  const resetErrors = () => {
    setErrorMsgs({priceError: "", quantityError: "", totalError: ""});
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
      dispatch(setBuyOrder({...values, [field]: userInput[userInput.length - 1]}));
    }
    // value is empty and first char is not a number
    else if(values[field as keyof typeof values] === "" && !number.test(userInput[userInput.length - 1])) {
      setErrorMsgs({...errorMsgs, [errorKey]: "Enter a number with up to two decimal places"});
    }
    // value is valid
    else if(decimals.test(userInput)) {
      setErrorMsgs({...errorMsgs, [errorKey]: ""});
      dispatch(setBuyOrder({...values, [field]: userInput}));
    }
  };


  const checkInput = (price: number, quantity: number) => {
    // check price input
    if(price <= 0) {
      setErrorMsgs({...errorMsgs, priceError: "Enter price"});
      return false;
    }
    // check quantity input
    if(quantity <= 0) {
      setErrorMsgs({...errorMsgs, quantityError: "Enter quantity"});
      return false;
    }

    return true;
  };


  const marketBuy = () => {
    const id = uuidv4();
    const buyPrice = parseFloat(values.price) || 0;
    const buyQuantity = parseFloat(values.quantity) || 0;
    const buyTotal = parseFloat(values.total) || 0;
    
    if(!checkInput(buyPrice, buyQuantity)) {
      return;
    }

    const match = sellOrders.some((sell: SellOrder, idx: number) => {
      if(buyPrice !== sell.price) {
        return false;
      }
      if(buyQuantity > sell.quantity) {
        setErrorMsgs({...errorMsgs, quantityError:"Requested quantity is not available at this price"});
      } else {
        if(buyQuantity < sell.quantity) {
          // execute order with required quantity (send api request)
          dispatch(reduceSellQuantity({idx, pair, buyQuantity, buyTotal}));
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
      setErrorMsgs({...errorMsgs, priceError: "No sell orders available at this price"});
    }
  };


  return (
    <BuyFormStyled id="buy-form" onBlur={() => handleFormBlur()}>
      <FieldSetStyled name="form-fieldset">
        <LegendStyled>Buy {currencyBase}</LegendStyled>
        <InputContainer>
          {
            inputAttrs.map((input) => {
              if(input.name !== "limit") {
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
              }
            })
          }
          <ButtonContainer>
            {/* @ts-expect-error styled component types */}
            <ButtonBuy id="buy-form-buy-button" type="button" name="buy-button" onClick={marketBuy}>BUY</ButtonBuy>
          </ButtonContainer>
        </InputContainer>
      </FieldSetStyled>
    </BuyFormStyled>
  );
};

export default BuyOrderForm;
