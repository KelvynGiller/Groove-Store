import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QrKRJCMEh4Z9AsLAd8ODLKXsVBIyu26TeTgXzv5iDGlsvdGdcYWbwpEqKqL8dZ2Yfzrwz8msRhNnenYEHgxEGnp005Iyvp0ua");

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;