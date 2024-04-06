import { useSelector, useDispatch } from "react-redux";
import { setCurrencyBase, setCurrencyQuote, swap } from "../features/selector/pairSelectorSlice";
import swapIcon from "../assets/icons/swap.svg"
import { codes, currencies } from "../app/tempDB";

import styled, { StyleSheetManager } from "styled-components";
import isValidProp from "@emotion/is-prop-valid";

import { mediaQueries, breakpoints } from "./styles/mediaQueries";
import { RootState } from "../app/store";


const Title = styled.h1`
  display: block;
  color: #eee;
  font-size: 1.2rem;
  text-align: center;
`; 


const SelectorContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin: 1rem auto;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  grid-template-rows: 1fr 1fr 1fr;
  ${mediaQueries("sm")`
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto;
    width: auto;
    justify-content: center;
    grid-gap: 0;
  `};
`;


const Switch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  padding: 0.5rem;
  background-color: #777;
  border: 1px solid #aaa;
  border-radius: 0.3rem;

  &:hover {
    background-color: #aaa;
    border-color: #eee;
  }
  &:focus-visible {
    background-color: #aaa;
    border-color: #eee;
  }
  &:active {
    background-color: #eee;
    border-color: #fff;
  }
  ${mediaQueries("sm")`
    padding: 0 0.5rem;  
    border-right-width: 0;
    border-left-width: 0;
    border-radius: 0;
  `};
  outline: none;
`;


type DropdownProps = {
  name: string;
}

const Dropdown = styled.select<DropdownProps>`
  background-color: #777;
  color: #111;
  height: 100%;
  font-family: "Roboto Condensed", system-ui;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 0.3rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #aaa;
  }
  &:focus {
    border: 1px solid white;
    background-color: #aaa;
  }
  @media (min-width: ${breakpoints.sm}px) {
    border-radius: ${(props) => ( props.name === "quote" ? "0px 0.3rem 0.3rem 0px" : "0.3rem 0px 0px 0.3rem")};
  }
  outline: none;
`;


const Img = styled.img`
  width: 1.5rem;
`;

export default function Selector() {

  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const dispatch = useDispatch();


  return (
    <>
      <Title>Currency pair</Title>
      <SelectorContainer>
        <StyleSheetManager shouldForwardProp={(name) => isValidProp(name)}>
        {/* @ts-expect-error styled component types */}
          <Dropdown position="left" name="base" id="currency-base" value={currencyBase} onChange={(event) => dispatch(setCurrencyBase(event.target.value))}>
            {codes.map((el) => {
              if(el !== currencyQuote)
              return <option value={el} key={el}>{currencies[el as keyof typeof currencies]}</option>;
            })}
          </Dropdown>
          <Switch onClick={() => dispatch(swap())}>
            <Img src={swapIcon} alt="swap currencies" className="btn icon"/>
          </Switch>
          <Dropdown name="quote" id="currency-quote" value={currencyQuote} onChange={(event) => dispatch(setCurrencyQuote(event.target.value))}>
            {codes.map((el) => {
              if(el !== currencyBase)
              return <option value={el} key={el}>{currencies[el as keyof typeof currencies]}</option>;
            })}
          </Dropdown>
        </StyleSheetManager>
      </SelectorContainer>
    </>
  );
}