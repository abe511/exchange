import { useSelector } from "react-redux";


export default function LimitOrder() {

  const currencyFrom = useSelector((state) => state.pairSelector.currencyFrom);
  const currencyTo = useSelector((state) => state.pairSelector.currencyTo);

  return (
    <>
      <form action="">
        <fieldset>
          <legend>Limit Order</legend>
            <label htmlFor="price">Price</label>
            <br />
            <input type="number" id="price" step={0.01} min={0.01} />
            <input type="text" value={currencyFrom} disabled/>
            <br />
            <label htmlFor="limit">Limit</label>
            <br />
            <input type="number" id="limit" step={0.01} min={0.01} />
            <input type="text" value={currencyFrom} disabled/>
            <br />
            <label htmlFor="quantity">Quantity</label>
            <br />
            <input type="number" id="quantity" step={0.01} min={0.01} />
            <input type="text" value={currencyTo} disabled/>
            <br />
            <label htmlFor="total">Total</label>
            <br />
            <input type="number" id="total" step={0.01} min={0.01} />
            <input type="text" value={currencyFrom} disabled/>
            <br />
            <button type="button" onClick={() => {console.log("buy")}}>BUY</button>
            <button type="button" onClick={() => {console.log("sell")}}>SELL</button>
        </fieldset>
      </form>
    </>
  );
}
