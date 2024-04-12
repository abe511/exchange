import { useSelector, useDispatch } from "react-redux";
import { setBuyOrder } from "../features/orders/buyOrderSlice";
import styled from "styled-components";

import { ArticleContainer, Caption, TableContainer, TableHeader, Table, Th, TableRow, Td } from "./History";
import { RootState } from "../app/store";


const SellOrderContainer = styled(ArticleContainer)`
  grid-area: sellList;
`;

const TableSellOrderRow = styled(TableRow)`
  cursor: pointer;
  background-color: #5b4a4a;
  &:nth-child(even) {
    background-color: #493c3c;
  }
  &:hover {
    background-color: #2b8f44;
  }
`;

const Cell = styled(Td)`
  &:nth-child(2) {
    color: unset;
  }
`;


export default function SellOrderList() {
  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const pair = `${currencyBase}${currencyQuote}`;
  const sellOrders = useSelector((state: RootState) => state.sellOrderList.orders[pair as keyof typeof state.sellOrderList.orders].sellOrders);

  const dispatch = useDispatch();


  const handleClick = (price: string, quantity: string, total: string) => {
    dispatch(setBuyOrder({price, quantity, total}));
  }


  return (
    <SellOrderContainer>
      <TableContainer>
        <Table>
          <Caption>Sell Orders</Caption>
          <TableHeader>
            <tr>
              <Th>Price</Th>
              <Th>{currencyQuote}</Th>
              <Th>{currencyBase}</Th>
            </tr>
          </TableHeader>
          <tbody>
            {sellOrders.map((el: {id: string, price: number, quantity: number, total: number}) => {
              return (
                <TableSellOrderRow key={el.id} onClick={() => {handleClick(el.price.toString(), el.quantity.toString(), el.total.toString())}}>
                  <Cell>{el.price}</Cell>
                  <Cell>{el.quantity}</Cell>
                  <Cell>{el.total}</Cell>
                </TableSellOrderRow>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </SellOrderContainer>
  );
}