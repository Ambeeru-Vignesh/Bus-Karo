import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.REACT_APP_PUBLIC_KEY}`);
  }

  return stripePromise;
};

export default getStripe;
