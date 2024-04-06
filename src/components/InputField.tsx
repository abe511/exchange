import styled from "styled-components";
import { StyleSheetManager } from "styled-components";
import isValidProp from "@emotion/is-prop-valid";
import React from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "../app/store";


export const FieldContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto 0.5rem;
  grid-template-columns: 70% 30%;
  grid-template-areas:
    "lbl lbl"
    "in txt"
    "msg msg"
    ; 
`;


export const LabelStyled = styled.label`
  font-weight: 500;
  grid-area: lbl;
  margin: 0.5rem 0.5rem;
`;


export const InputStyled = styled.input`
  width: 100%;
  height: 100%;
  background-color: #aaa;
  color: #222;
  font-size: 1.1rem;
  font-family: system-ui;
  grid-area: in;
  padding-left: 0.5rem;
  box-sizing: border-box;
  border-radius: 0.3rem 0 0 0.3rem;
  border: 1px solid #555;
  border-right: 0;
  &:focus {
    background-color: #ddd;
    border: 1px solid #fff;
    outline: none;
  }
  `;


  export const TextStyled = styled.div`
  border-radius: 0 0.3rem 0.3rem 0;
  border: 1px solid #555;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0;
  grid-area: txt;
  text-align: center;
`;


export const MessageWrapper = styled.div`
  display: block;
  grid-area: msg;
`;


export const MessageContainer = styled.div`
  position: absolute;
  `;


export const Message = styled.span`
  color: whitesmoke;
  font-family: system-ui;
  font-weight: 400;
  position: relative;
  top: 0.3rem;
  left: 1rem;
  background-color: #222;
  background-color: #000a;
  border: 1px solid #333;
  border-radius: 0.3rem;
  line-height: 1.5rem;
  padding: 0.5rem;
  width: inherit;
  overflow: visible;
  z-index: 1000;
  transition: opacity 100% 2ms;
`;


type Props = {
  type: string,
  label: string,
  inputValue: string,
  currency: string,
  setValue: Dispatch,
  setError: Dispatch,
  error: string,
}

const InputField: React.FC<Props> = ({ type, label, inputValue, currency, setValue, setError, error }) => {

  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  // @ts-expect-error dispatch types
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>, setValue, setError, dispatch) => {
    if(/^\d*\.?\d{0,2}$/.test(event.target.value)) {
      setError("");
      dispatch(setValue(event.target.value));
    } else {
      setError("Enter a number with up to two decimal places");
    }
  };


  return (
    <FieldContainer>
      <LabelStyled id={label} htmlFor={type}>{label}</LabelStyled>
      <InputStyled type="text" id={type} name={type} value={inputValue} onChange={(event) => inputHandler(event, setValue, setError, dispatch)} />
      <TextStyled>{currency}</TextStyled>
      <MessageWrapper>
        <MessageContainer>
          <StyleSheetManager shouldForwardProp={(error) => isValidProp(error)}>
            {/* @ts-expect-error styled components types*/}
            {error && <Message id="msg" error="true">{error}</Message>}
          </StyleSheetManager>
        </MessageContainer>
      </MessageWrapper>
    </FieldContainer>
  );
};

export default InputField;
