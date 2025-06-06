import config from "../config.js";
import Stripe from "stripe";

const stripe = new Stripe(config.stripeKey);

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creando el pago", error });
  }
};