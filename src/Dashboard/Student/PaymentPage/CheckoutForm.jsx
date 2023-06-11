/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';
import UseAuth from '../../../Hook/UseAuth';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const CheckoutForm = ({ paymentItem }) => {
  const { axiosSecure } = UseAxiosSecure()
  const { user } = UseAuth()
  const stripe = useStripe()
  const elements = useElements()
  const [isDisable, setIsDisable] = useState(false)
  const [clientSecret, setClientSecret] = useState(null)
  const [error, setError] = useState(null)

  // create payment intent and get client secret for further payment process
  useEffect(() => {
    if (paymentItem?.price > 0) {
      axiosSecure.post('/create-payment-intent', { price: paymentItem?.price })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(e => console.log(e.message))
    }
  }, [paymentItem?.price, axiosSecure])

  // handlePaymentSubmit
  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setIsDisable(true)
    if (!stripe || !elements) {
      setIsDisable(false)
      return
    }

    const cardElement = elements.getElement(CardElement);
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setIsDisable(false)
      return
    }


    Swal.fire({
      title: 'Are you sure?',
      text: "You never revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#02066f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make payment!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDisable(true)

        const { error: confirmPaymentErr, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user?.email || null,
              name: user?.displayName || null
            }
          },
        });

        if (confirmPaymentErr) {
          setError(confirmPaymentErr.message);
          setIsDisable(false)
          return
        }

        setError('')


        // store payment data in database > stored in enrolled classes > remove from selected classes > reduce available seat from particular class 
        const { paymentTrxId, amount } = paymentIntent
        const paymentInfo = { selectedClassId: paymentItem?._id, classId: paymentItem?.classId, trxId: paymentTrxId, amount, date: new Date(), user: user?.displayName, email: user?.email }

        axiosSecure.post('/store-payment-info', paymentInfo)
          .then(res => {
            if (res.data.acknowledged) {

              const enrolledClass = { ...paymentItem, trxId: paymentTrxId, date: new Date(), enrolledBy: user?.email }
              axiosSecure.post('/enrolled-classes', { enrolledClass })
                .then(res => {
                  if (res.data?.acknowledged) {

                    // Delete selected classes
                    axiosSecure.delete(`/delete-my-selected-classes?email=${user?.email}&&id=${paymentItem.classId}`)
                      .then(res => {
                        if (res.data?.acknowledged) {

                          //  reduce available seat...
                          axiosSecure.patch('/reduce-available-seat-from-class', { classId: paymentItem?.classId })
                            .then(res => {

                              if (res.data?.acknowledged) {
                                setIsDisable(false)
                                // TODO: not working because of asynchronous behavior !paymentInfo condition
                                toast.success('Payment success!', {
                                  position: "top-right",
                                  autoClose: 1500,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light",
                                });
                                localStorage.removeItem('payment-info')
                              }

                            }).catch(e => setError(e.message))

                        }
                      }).catch(e => setError(e.message))


                  }
                }).catch(e > setError(e.message))

            }
          }).catch(e => setError(e.message))
      }
    })

    setIsDisable(false)
  }



  // if no payment info then , nothing to payment
  const paymentInfo = localStorage.getItem('payment-info')
  if (!paymentInfo) {
    return <div className="h-screen  flex items-center justify-center"><h2 className='text-4xl text-white font-bold bg-red-500 p-3'>There is no payment info right now!</h2></div>
  }


  // card component style
  const inputStyle = {
    iconColor: '#c4f0ff',
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: '#87BBFD',
    },

  }

  return (
    <form onSubmit={handlePaymentSubmit} className='w-[500px]'>

      <CardElement options={{
        style: {
          base: inputStyle,
        },
      }}></CardElement>

      {error && <p className='text-red-500 my-2'>{error}</p>}
      <button disabled={!stripe || !elements || !paymentItem?.price || isDisable} type='submit' className={`test cmn-btn-two my-4 ${isDisable && 'bg-[#063a92] text-slate-300'}`}>Payment</button>


      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </form>

  );
};

export default CheckoutForm;