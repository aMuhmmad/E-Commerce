import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentButton, PaymentFormContainer } from "./payment-form.styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cart/cart.action";


const PaymentForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error,paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect:'if_required'
    });


    if (error) {
      setMessage(error.message);
    }else if(paymentIntent && paymentIntent.status === 'succeeded'){
      setMessage(`Payment status: ${paymentIntent.status}`);
      dispatch(clearCart());
      window.location.replace('/');
    }
     else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
    
  };


  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <PaymentFormContainer>
      <FormContainer id="payment-form" onSubmit={handleSubmit}>
        <h2>Credit Card Payment:</h2>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted} disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </PaymentButton>
        {message && <div id="payment-message">{message}</div>}
      </FormContainer>
    </PaymentFormContainer>
  )

}
export default PaymentForm;