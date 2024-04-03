import RateChart from "../components/RateChart";
import Selector from "../components/Selector";
import BuyOrderForm from "../components/BuyOrderForm";
import LimitOrderForm from "../components/LimitOrderForm";
import SellOrderForm from "../components/SellOrderForm";
import BuyOrderList from "../components/BuyOrderList";
import SellOrderList from "../components/SellOrderList";
import History from "../components/History";

import styled from "styled-components";

import { mediaQueries } from "../components/styles/mediaQueries";


// import "../styles/App.css";

const Main = styled.main`
  width: auto;
  // max-width: 70%;
  height: 100%;
  // border: 3px solid green;
  padding: 1rem 5%;
  margin: 0 auto;
  ${mediaQueries("md")`
  padding: 2rem 10%;
`};
  ${mediaQueries("lg")`
    padding: 3rem 15%;
  `};
`;

const FormContainer = styled.section`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "limitForm"
    "buyForm"
    "sellForm"
  ;
  column-gap: 0.5rem;
  font-weight: 500;
  // border: 2px solid lime;
  ${mediaQueries("sm")`
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "limitForm limitForm"
      "buyForm sellForm"
  ;
  `};
  ${mediaQueries("lg")`
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "buyForm limitForm sellForm"
    ;
  `};
  `;
  
const ListContainer = styled.section`
  display: grid;
  margin-top: 0.5rem;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "buyList"
    "sellList"
    "hist"
  ;
  column-gap: 0.5rem;
  
  ${mediaQueries("sm")`
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
  "sellList buyList"
  "hist hist"
  ;
  
  `};
  ${mediaQueries("xxl")`
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas:
      "sellList hist buyList"
      ;
  `};
`;

export default function App() {
  return (
      <Main>
        {/* <RateChart /> */}
        <Selector />
        <FormContainer>
          <BuyOrderForm />
          <LimitOrderForm />
          <SellOrderForm />
        </FormContainer>
        <ListContainer>
          <SellOrderList />
          <History />
          <BuyOrderList />
        </ListContainer>
      </Main>
  );
}