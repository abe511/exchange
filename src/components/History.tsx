import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../app/store";


export const ArticleContainer = styled.article`
  height: fit-content;
  border: 1px solid #555;
  border-radius: 0.3rem;
  margin-bottom: 0.5rem;
`;


const HistoryContainer = styled(ArticleContainer)`
  grid-area: hist;
`;


export const Caption = styled.caption`
  color: #eee;
  width: fit-content;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem;
  margin: 0 auto;
`;


export const TableContainer = styled.article`
  height: 15rem;
  outline: none;
  overflow-y: scroll;
  &:focus {
    border-color: #eee;
  }
`;


export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;


export const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  font-weight: 300;
`;


export const Th = styled.th`
  font-weight: 500;
  background-color: #333;
  padding: 0.5rem 0 0.5rem 0.5rem;
  text-align: left;
  margin: 0;
  opacity: 90%;
`;


export const Td = styled.td<{type?: string}>`
  padding: 0.2rem 0.5rem;
  border: 2px solid #green;
  &:nth-child(2) {
    color: ${(props) => (props.type === "Buy" ? "#ccffd0" : "#ffdada")};
  }
`;


  export const TableRow = styled.tr<{type?: string}>`
  background-color: #3d3d3d;
  
  &:nth-child(even) {
    background-color: #4d4d4d;
  }
  &:hover {
    background-color: ${(props) => (props.type === "Buy" ? "#505f55" : "#5b4a4a")};
    color: #fff;
  }
`;


export default function History() {
  const currencyBase = useSelector((state: RootState) => state.pairSelector.currencyBase);
  const currencyQuote = useSelector((state: RootState) => state.pairSelector.currencyQuote);
  const pair = `${currencyBase}${currencyQuote}`;
  const data = useSelector((state: RootState) => state.history.orders[pair as keyof typeof state.history.orders].history.data);
  const history = [...data].reverse();

  return (
    <HistoryContainer>
      <TableContainer>
        <Table>
          <Caption>Trade History</Caption>
          <TableHeader>
            <tr>
              <Th>Date</Th>
              <Th>Type</Th>
              <Th>Price {currencyBase}</Th>
              <Th>Quantity {currencyQuote}</Th>
              <Th>Total {currencyBase}</Th>
            </tr>
          </TableHeader>
          <tbody>
            {history.map((el: {id: string, date: Date, price: number, quantity: number, total: number, type: string}) => {
              const date = new Date(el.date).toLocaleString();
              return (
                <TableRow key={el.id} type={el.type}>
                  <Td>{date}</Td>
                  <Td type={el.type}>{el.type}</Td>
                  <Td>{el.price}</Td>
                  <Td>{el.quantity}</Td>
                  <Td>{el.total}</Td>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </HistoryContainer>
  );
}
