## exchange

#### React, Redux Toolkit, Typescript, Styled Components, Chart.js
---
check out the demo:
### [**render**](https://exchange11.onrender.com/)
### [**netlify**](https://https://metabolismus.netlify.app/)
---
The app allows users to:

* Place orders.
* Convert between different currencies.
* Track currency exchange history.

Features:
* Simple and intuitive user interface.
* Market and Limit orders.
* Support for multiple currencies.
* Real-time chart.
* Transaction history tracking.


---


#### Run locally:

```
git clone
npm install
npm run build
npm run preview
```
open *http://localhost:4173* in a browser

---

#### Usage:

##### Currency pair.
Select currency pair from dropdown menus.
Switch currencies by pressing the button between the menus.

##### Market Orders.
Enter price and quantity for the order you want to buy or sell in 'Buy' or 'Sell' form or click on the order listing below to auto-fill the form.
Press the button on the bottom of the corresponding form. If there is an order placed with matching price and quantity, your order will be executed. Otherwise, it is cancelled.

##### Limit Orders.
Enter price or limit, and quantity.
Press **Buy** or **Sell** button on the bottom of the 'Limit Order' form.
'Price' orders can only be executed *fully*. In case there is no matching order at the moment, your orders is placed in the queue, to be executed later.
Unlike 'Price' orders, 'Limit' orders can be fulfilled *partially*, and the remainder is placed in a queue as a limit order.
In case you enter both the price and the limit, the latter takes priority.

---

##### Implementation Details:

'Limit' orders are matched using a custom implementation of time-priority matching algorithm. The order that was placed first is matched first. If a 'price' order can not be currently executed, it gets skipped till a matching order is placed.

