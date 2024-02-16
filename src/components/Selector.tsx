import { useState } from "react";
import swapIcon from "../assets/swap.svg"


const data = ["USD", "RUB", "EUR", "CNY", "JPY"];

const currencies = {
  USD: "United States Dollar",
  RUB: "Russian Ruble",
  EUR: "Euro",
  CNY: "Chinese Yuan",
  JPY: "Japanese Yen"
};


export default function Selector() {

  const [currencyFrom, setCurrencyFrom] = useState(data[0]);
  const [currencyTo, setCurrencyTo] = useState(data[1]);

  const handleFromSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencyFrom(event.target.value);
  };

  const handleToSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencyTo(event.target.value);
  };

  const handleSwap = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  return (
    <>
      <p>Currency pair</p>
      <select name="from" id="currency-from" value={currencyFrom} onChange={handleFromSelection}>
        {data.map((el) => {
          if(el !== currencyTo)
            return <option value={el} key={el}>{currencies[el as keyof typeof currencies]}</option>;
        })}
      </select>
      <button onClick={handleSwap}>
        <img src={swapIcon} alt="swap currencies" className="btn icon" width={24}/>
        </button>
      <select name="to" id="currency-to" value={currencyTo} onChange={handleToSelection}>
        {data.map((el) => {
          if(el !== currencyFrom)
            return <option value={el} key={el}>{currencies[el as keyof typeof currencies]}</option>;
        })}
      </select>
    </>
  );
}