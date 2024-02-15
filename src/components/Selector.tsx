
const currency = [
  {
    name: "United States Dollar",
    iso: "USD"
  },
  {
    name: "Russian Ruble",
    iso: "RUB"
  },
  {
    name: "Euro",
    iso: "EUR"
  },
  {
    name: "Chinese Yuan",
    iso: "CNY"
  },
]


export default function Selector() {

  return (
    <>
      <select name="pair" id="pair">
        {currency.map((el) => {
          return <option value={el.iso} key={el.iso}>{el.name}</option>
        })}
      </select>
      <button>switch</button>
      <select name="pair" id="pair">
        {currency.map((el) => {
          return <option value={el.iso} key={el.iso}>{el.name}</option>
        })}
      </select>
    </>
  );
}