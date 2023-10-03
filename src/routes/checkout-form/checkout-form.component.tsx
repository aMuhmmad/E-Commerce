import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import PaymentForm from "../../components/payment-form/payment-form.component";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../utils/stripe/stripe.utils";
import { Appearance, StripeElementsOptions } from "@stripe/stripe-js";

const CheckoutForm = () => {
    const [clientSecret, setClientSecret] = useState("");

    const cartTotal = useSelector(selectCartTotal);


    useEffect(() => {
        fetch("http://localhost:4242/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(cartTotal),

        }).then(async (res) => {
            const { clientSecret } = await res.json();
            setClientSecret(clientSecret);

        }).catch(e => console.log(e))

    }, [cartTotal]);


    const appearance: Appearance = {
        theme: 'stripe',
    };
    const options: StripeElementsOptions = {
        clientSecret,
        appearance,
    };
    return (
        <>

            {stripePromise && clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            )}
        </>
    )
}

export default CheckoutForm;