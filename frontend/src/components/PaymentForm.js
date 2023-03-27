import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

function PaymentForm({ amount, currency, email }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email,
      },
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const response = await axios.post("/api/bookings/make-payment", {
          amount,
          currency,
          email,
          token: id,
        });

        console.log(response.data.message);
      } catch (err) {
        console.log(err.response.data.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
}

export default PaymentForm;
