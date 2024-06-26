import { useSelector, useDispatch } from "react-redux";
import { setSellOrder } from "../features/orders/sellOrderSlice";
import styled from "styled-components";
import { ArticleContainer, Caption, TableContainer, TableHeader, Table, Th, TableRow, Td } from "./History";
import { RootState } from "../app/store";

const BuyOrderContainer = styled(ArticleContainer)`
  grid-area: buyList;
`;

const TableBuyOrderRow = styled(TableRow)`
  cursor: pointer;
  background-color: #505f55;
  &:nth-child(even) {
    background-color: #404e44;
  }
  &:hover {
    background-color: #8f2b2b;
  }
`;

const Cell = styled(Td)`
  &:nth-child(2) {
    color: unset;
  }
`;

export default function BuyOrderList() {
  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const pair = `${currencyBase}${currencyQuote}`;
  const buyOrders = useSelector((state: RootState) => state.buyOrderList.orders[pair as keyof typeof state.buyOrderList.orders].buyOrders);

  const dispatch = useDispatch();

  const handleClick = (price: string, quantity: string, total: string) => {
    dispatch(setSellOrder({price, quantity, total}));
  }

  return (
    <BuyOrderContainer>
      <TableContainer>
        <Table>
          <Caption>Buy Orders</Caption>
          <TableHeader>
            <tr>
              <Th>Price</Th>
              <Th>{currencyQuote}</Th>
              <Th>{currencyBase}</Th>
            </tr>
          </TableHeader>
          <tbody>
            {buyOrders.map((el: {id: string, price: number, quantity: number, total: number}) => {
              return (
                <TableBuyOrderRow key={el.id} onClick={() => {handleClick(el.price.toString(), el.quantity.toString(), el.total.toString())}}>
                  <Cell>{el.price}</Cell>
                  <Cell>{el.quantity}</Cell>
                  <Cell>{el.total}</Cell>
                </TableBuyOrderRow>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </BuyOrderContainer>
  );
}