
const data = [
  {
    id: 234234,
    date: new Date().toLocaleString(),
    type: "Sell",
    price: 23,
    quantity: 234,
    total: 1244
  },
  {
    id: 234298,
    date: new Date().toLocaleString(),
    type: "Buy",
    price: 223,
    quantity: 5234,
    total: 12644
  },
  {
    id: 234289,
    date: new Date().toLocaleString(),
    type: "Buy",
    price: 423,
    quantity: 2534,
    total: 13444
  },
  {
    id: 234245,
    date: new Date().toLocaleString(),
    type: "Sell",
    price: 31,
    quantity: 345,
    total: 23449
  },
  {
    id: 234256,
    date: new Date().toLocaleString(),
    type: "Sell",
    price: 56,
    quantity: 2640,
    total: 5674
  },
];


export default function History() {


  return (
    <>
      <p>Trade History</p>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Price</th>
            <th>RUB</th>
            <th>USD</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => {
            return (
              <tr key={el.id}>
                <td>{el.date}</td>
                <td>{el.type}</td>
                <td>{el.price}</td>
                <td>{el.quantity}</td>
                <td>{el.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}