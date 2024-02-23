import PriceChart from "../components/PriceChart";
import Selector from "../components/Selector";
import Bid from "../components/Bid";
import LimitOrder from "../components/LimitOrder";
import Offer from "../components/Offer";
import BuyOrders from "../components/BuyOrders";
import SellOrders from "../components/SellOrders";
import History from "../components/History";


import "../styles/App.css";


export default function App() {
  return (
    <>
      <main>
        <PriceChart />
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