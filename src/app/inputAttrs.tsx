
const inputAttrs = [
  {
    type: "text",
    form: "limit-form",
    name: "price",
    label: "Price",
    errorMsg: "priceError",
    pattern: "^[0-9]+(.[0-9]{1,2})?$",
    required: true
  },
  {
    type: "text",
    form: "limit-form",
    name: "limit",
    label: "Limit",
    errorMsg: "limitError",
    pattern: "^[0-9]+(.[0-9]{1,2})?$",
    required: true
  },
  {
    type: "text",
    form: "limit-form",
    name: "quantity",
    label: "Quantity",
    errorMsg: "quantityError",
    pattern: "^[0-9]+(.[0-9]{1,2})?$",
    required: true
  },
  {
    type: "text",
    form: "limit-form",
    name: "total",
    label: "Total",
    errorMsg: "totalError",
    readOnly: true
  },
];

export default inputAttrs;