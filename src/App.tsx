import Chart from "./components/Chart";
import Selector from "./components/Selector";
import Bid from "./components/Bid";
import LimitOrder from "./components/LimitOrder";
import Offer from "./components/Offer";
import BuyOrders from "./components/BuyOrders";
import SellOrders from "./components/SellOrders";
import History from "./components/History";


const style = {
  border: "1px solid red",
  padding: "1rem",
  // width:"600px",
  // height:"400px"
};

export default function App() {
  return (
    <>
      <main style={style}>
        <Chart />
        <Selector />
        <Bid />
        <LimitOrder />
        <Offer />
        <BuyOrders />
        <SellOrders />
        <History />
      </main>
    </>
  );
}