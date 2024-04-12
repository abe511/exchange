
type FormInput = {
  price: string,
  quantity: string,
  total: string
}

type BuyOrder = {
  id: string,
  pair: string,
  date: Date,
  type: string,
  price: number,
  quantity: number,
  total: number
}

type SellOrder = {
  id: string,
  pair: string,
  date: Date,
  type: string,
  price: number,
  quantity: number,
  total: number
}

type LimitFormInput = {
  price: string,
  limit: string,
  quantity: string,
  total: string
}

type LimitBuy = {
  id: string,
  pair: string,
  date: Date,
  type: string,
  price: number,
  limit: number,
  quantity: number,
  total: number
};

type LimitSell = {
  id: string,
  pair: string,
  date: Date,
  type: string,
  price: number,
  limit: number,
  quantity: number,
  total: number
};

type LimitOrder = {
  id: string,
  pair: string,
  price: number,
  limit: number,
  quantity: number,
  total: number
};

type HistoryRecord = {
  id: string,
  pair: string,
  date: number,
  type: string,
  price: number,
  quantity: number,
  total: number
};

type InputFieldProps = {
  id: string,
  name: string;
  label: string,
  value: string,
  currency: string,
  errorMsg: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  autoComplete: string
}

type DropdownProps = {
  name: string;
}