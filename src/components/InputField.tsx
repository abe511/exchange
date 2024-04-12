import styled from "styled-components";
import React from "react";


export const FieldContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 70% 30%;
  grid-template-areas:
    "lbl lbl"
    "in txt"
    "msg msg"
    ;
  margin-bottom: 1rem;
`;

export const LabelStyled = styled.label`
  font-weight: 500;
  grid-area: lbl;
  margin: 0.3rem 0.5rem;
`;

// export const InputStyled = styled.input<InputFieldProps>`
export const InputStyled = styled.input<{name? : string}>`
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
    background-color: ${(props) => props.name === "total" ? "#bbb": "#eee"};
    border: 2px solid #fff;
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
  // background-color: #000a;
  background-color: #000;
  border: 1px solid #333;
  border-radius: 0.3rem;
  line-height: 1.5rem;
  padding: 0.5rem;
  width: inherit;
  overflow: visible;
  z-index: 1000;
  opacity: 80%;
  transition: opacity 80% 200ms;
`;


const InputField: React.FC<InputFieldProps> = ({ id, name, label, currency, errorMsg, onChange, ...otherProps }) => {
  return (
    <FieldContainer className="input-container">
      <LabelStyled htmlFor={id}>{`${label} ${currency}`}</LabelStyled>
      <InputStyled id={id} name={name} onChange={onChange} {...otherProps} />
      <TextStyled>{currency}</TextStyled>
      <MessageWrapper>
        <MessageContainer>
          {errorMsg && <Message>{errorMsg}</Message>}
        </MessageContainer>
      </MessageWrapper>
    </FieldContainer>
  );
};


export default InputField;