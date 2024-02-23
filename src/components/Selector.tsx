import { useSelector, useDispatch } from "react-redux";
import { setCurrencyFrom, setCurrencyTo, swap } from "../features/selector/pairSelectorSlice";
import swapIcon from "../assets/swap.svg"
import { data, currencies } from "../app/tempDB";


export default function Selector() {

  const currencyFrom = useSelector((state) => state.pairSelector.currencyFrom);
  const currencyTo = useSelector((state) => state.pairSelector.currencyTo);
  const dispatch = useDispatch();

  return (
    <>
      <p>Currency pair</p>
      <select name="from" id="currency-from" value={currencyFrom} onChange={(event) => dispatch(setCurrencyFrom(event.target.value))}>
        {data.map((el) => {
          if(el !== currencyTo)
            return <option value={el} key={el}>{currencies[el as keyof typeof currencies]}</option>;
        })}
      </select>
      <button onClick={() => dispatch(swap())}>
        <img src={swapIcon} alt="swap currencies" className="btn icon" width={24}/>
        </button>
      <select name="to" id="currency-to" value={currencyTo} onChange={(event) => dispatch(setCurrencyTo(event.target.value))}>
        {data.map((el) => {
          if(el !== currencyFrom)
            return <option value={el} key={el}>{currencies[el as keyof typeof currencies]}</option>;
        })}
      </select>
    </>
  );
}