import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import bgImg from '../../../assets/img/signinBg.jpg'

const PaymentPage = () => {
    const [paymentItem, setPaymentItem] = useState(null)

    // retrieve data from local storage
    useEffect(() => {
        const storedPaymentItem = JSON.parse(localStorage.getItem('payment-info'));
        setPaymentItem(storedPaymentItem);
    }, []);

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

    return (
        <div className="h-screen flex items-center justify-center bg-center bg-cover bg-slate-800 bg-blend-overlay" style={{backgroundImage: `url(${bgImg})`}}>
            {/* <h2>This is payment page</h2> */}
            <Elements stripe={stripePromise}>
                <CheckoutForm paymentItem={paymentItem}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default PaymentPage;