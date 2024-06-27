import { writable } from "svelte/store";

const paymentData = writable({
  amount: "",
  cardNumber: "",
  expiryDate: "",
  cvv: ""
});

export default paymentData;