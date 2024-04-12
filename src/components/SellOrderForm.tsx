import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import InputField from "./InputField";
import { ButtonSell } from "./styles/ButtonStyled";
import inputAttrs from "../app/inputAttrs";

import { setSellOrder } from "../features/orders/sellOrderSlice";
import { removeBuyOrder, reduceBuyQuantity } from "../features/orders/buyOrderListSlice";
import { addToHistory } from "../features/history/historySlice";
import { RootState } from "../app/store";

import { FormStyled, FieldSetStyled, LegendStyled, InputContainer, ButtonContainer } from "./BuyOrderForm";


const SellFormStyled = styled(FormStyled)`
  grid-area: sellForm;
`;


export default function SellOrderForm() {

  const values: FormInput = useSelector((state: RootState) => state.sellOrder);

  const [ errorMsgs, setErrorMsgs ] = useState({
    priceError: "",
    quantityError: "",
    totalError: "",
  });

  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const pair = `${currencyBase}${currencyQuote}`;
  const buyOrders = useSelector((state: RootState) => state.buyOrderList.orders[pair as keyof typeof state.buyOrderList.orders].buyOrders);

  const dispatch = useDispatch();

  // calculate and set total
  useEffect(() => {
    const priceValue = parseFloat(values.price) || 0;
    const quantityValue =  parseFloat(values.quantity) || 0;
    let newTotal = "";
    if(priceValue > 0 && quantityValue > 0) {
      newTotal = (quantityValue / priceValue).toFixed(2);
    }
    dispatch(setSellOrder({...values, total: newTotal}));
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
      dispatch(setSellOrder({...values, [field]: userInput[userInput.length - 1]}));
    }
    // value is empty and first char is not a number
    else if(values[field as keyof typeof values] === "" && !number.test(userInput[userInput.length - 1])) {
      setErrorMsgs({...errorMsgs, [errorKey]: "Enter a number with up to two decimal places"});
    }
    // value is valid
    else if(decimals.test(userInput)) {
      setErrorMsgs({...errorMsgs, [errorKey]: ""});
      dispatch(setSellOrder({...values, [field]: userInput}));
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


  const marketSell = () => {
    const id = uuidv4();
    const sellPrice = parseFloat(values.price) || 0;
    const sellQuantity = parseFloat(values.quantity) || 0;
    const sellTotal = parseFloat(values.total) || 0;

    if(!checkInput(sellPrice, sellQuantity)) {
      return;
    }

    const match = buyOrders.some((buy: BuyOrder, idx: number) => {
      if(sellPrice !== buy.price) {
        return false;
      }
      if(sellQuantity > buy.quantity) {
        setErrorMsgs({...errorMsgs, quantityError:"Requested quantity is not available at this price"});
      } else {
        if(sellQuantity < buy.quantity) {
          // execute order with required quantity (send api request)
          dispatch(reduceBuyQuantity({idx, pair, sellQuantity, sellTotal}));
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
      setErrorMsgs({...errorMsgs, priceError: "No buy orders available at this price"});
    }

  };


  return (
    <SellFormStyled id="sell-form" onBlur={() => handleFormBlur()}>
    <FieldSetStyled name="form-fieldset">
      <LegendStyled>Sell {currencyBase}</LegendStyled>
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
          <ButtonSell id="sell-form-sell-button" type="button" name="sell-button" onClick={marketSell}>Sell</ButtonSell>
        </ButtonContainer>
      </InputContainer>
    </FieldSetStyled>
    </SellFormStyled>
  );
}
