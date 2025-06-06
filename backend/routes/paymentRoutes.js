import express from "express";
import Stripe from "stripe";
import config from "../config.js";

const router = express.Router();
const stripe = new Stripe(config.stripeKey);

// Ruta para crear un Payment Intent
router.post("/create-payment-intent", async (req, res) => {
  const { amount, currency = "usd" } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // en centavos: 1000 = $10.00
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("❌ Error al crear el PaymentIntent:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;