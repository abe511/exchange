

export const codes = ["USD", "RUB", "EUR", "CNY", "JPY"];

export const currencies = {
  USD: "United States Dollar",
  RUB: "Russian Ruble",
  EUR: "Euro",
  CNY: "Chinese Yuan",
  JPY: "Japanese Yen"
};

// "USDEUR": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [{x:1709774046357, y: 15}, {x:1709774046389, y: 17}, {x:1709774046457, y: 16}], "Sell": [{x:1709774046237, y: 11}, {x:1709774046319, y: 13}, {x:1709774046417, y: 15}, {x:1709774046517, y: 14}]}}},
// "USDRUB": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [{x:1709774046157, y: 56}, {x:1709774046589, y: 53}, {x:1709774046757, y: 46}, {x:1709774046857, y: 56}], "Sell": [{x:1709774046257, y: 55}, {x:1709774046329, y: 47}, {x:1709774046557, y: 56}]}}},


export const data = [
  {
    "USDEUR": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "USDRUB": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "USDCNY": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "USDJPY": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "EURUSD": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "EURRUB": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "EURCNY": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "EURJPY": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "RUBUSD": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "RUBEUR": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "RUBCNY": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "RUBJPY": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "CNYUSD": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "CNYEUR": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "CNYRUB": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "CNYJPY": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "JPYUSD": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "JPYEUR": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "JPYRUB": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
    "JPYCNY": {buyRate: [], sellRate: [], buyOrders: [], sellOrders: [], history: {data: [],timeseries: {"Buy": [], "Sell": []}}},
  }
];



// export const timeseries = [ {
//     "USDEUR": {buy: [], sell: []},
//     "USDRUB": {buy: [], sell: []},
//     "USDCNY": {buy: [], sell: []},
//     "USDJPY": {buy: [], sell: []},
    
//     "EURUSD": {buy: [], sell: []},
//     "EURRUB": {buy: [], sell: []},
//     "EURCNY": {buy: [], sell: []},
//     "EURJPY": {buy: [], sell: []},
    
//     "RUBUSD": {buy: [], sell: []},
//     "RUBEUR": {buy: [], sell: []},
//     "RUBCNY": {buy: [], sell: []},
//     "RUBJPY": {buy: [], sell: []},
    
//     "CNYUSD": {buy: [], sell: []},
//     "CNYEUR": {buy: [], sell: []},
//     "CNYRUB": {buy: [], sell: []},
//     "CNYJPY": {buy: [], sell: []},
    
//     "JPYUSD": {buy: [], sell: []},
//     "JPYEUR": {buy: [], sell: []},
//     "JPYRUB": {buy: [], sell: []},
//     "JPYCNY": {buy: [], sell: []},
//   }
// ];


// export const buyOrders = [
//   {
//     id: 234234,
//     price: 23,
//     quantity: 234,
//     total: 1244
//   },
//   {
//     id: 234298,
//     price: 223,
//     quantity: 5234,
//     total: 12644
//   },
//   {
//     id: 234289,
//     price: 423,
//     quantity: 2534,
//     total: 13444
//   },
//   {
//     id: 234245,
//     price: 31,
//     quantity: 345,
//     total: 23449
//   },
//   {
//     id: 234256,
//     price: 56,
//     quantity: 2640,
//     total: 5674
//   },
// ];


// export const sellOrders = [
//   {
//     id: 234234,
//     price: 231,
//     quantity: 234,
//     total: 1244
//   },
//   {
//     id: 234298,
//     price: 223,
//     quantity: 5234,
//     total: 12644
//   },
//   {
//     id: 234289,
//     price: 423,
//     quantity: 2534,
//     total: 13444
//   },
//   {
//     id: 234245,
//     price: 31,
//     quantity: 345,
//     total: 23449
//   },
//   {
//     id: 234256,
//     price: 56,
//     quantity: 2640,
//     total: 5674
//   },
// ];

// export const historyData = [
//   {
//     id: 234234,
//     date: new Date().toLocaleString(),
//     type: "Sell",
//     price: 23,
//     quantity: 234,
//     total: 1244
//   },
//   {
//     id: 234298,
//     date: new Date().toLocaleString(),
//     type: "Buy",
//     price: 223,
//     quantity: 5234,
//     total: 12644
//   },
//   {
//     id: 234289,
//     date: new Date().toLocaleString(),
//     type: "Buy",
//     price: 423,
//     quantity: 2534,
//     total: 13444
//   },
//   {
//     id: 234245,
//     date: new Date().toLocaleString(),
//     type: "Sell",
//     price: 31,
//     quantity: 345,
//     total: 23449
//   },
//   {
//     id: 234256,
//     date: new Date().toLocaleString(),
//     type: "Sell",
//     price: 56,
//     quantity: 2640,
//     total: 5674
//   },
// ];