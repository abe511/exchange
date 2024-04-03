import styled from "styled-components";
import Button from "../Button";


export const ButtonPrimary = styled(Button)`
  width: 5rem;
  color: #111;
  background-color: #777;
  font-family: "Roboto Condensed", system-ui;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.25rem;
  border: 1px solid #aaa;
  border-radius: 0.3rem;
  cursor: pointer;
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
  outline: none;
`;

export const ButtonBuy = styled(ButtonPrimary)`
  color: #ccffd0;
  width: 100%;
  padding: 0.5rem;
  background-color: #2b8f44;
  border: 1px solid #51ff57;
  &:hover {
    background-color: #78c68b;
    border-color: #85ff75;
    color: #cdffc1;
  }
  &:focus-visible {
    background-color: #78c68b;
    border-color: #85ff75;
    color: #cdffc1; 
  }
  &:active {
    background-color: #84fea2;
    border-color: #cbffc1;
    color: #bdcab0;
  }
`;

export const ButtonSell = styled(ButtonPrimary)`
  color: #ffdada;
  background-color: #8f2b2b;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ff5151;
  &:hover {
    color: #ffc1c1;
    background-color: #c67878;
    border-color: #ff7575;
  }
  &:focus-visible {
    color: #ffc1c1;
    background-color: #c67878;
    border-color: #ff7575;
  }
  &:active {
    background-color: #fe8484;
    border-color: #ffc1c1;
    color: #a38282;
  }
`;