//require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createPaymentLink, handlePaymentConfirmation } = require('./paymentController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Handle /create-payment requests from the Discord bot
app.post('/create-payment', async (req, res) => {
  const { discordId, amount, wallet } = req.body;

  if (!discordId || !amount || !wallet) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const paymentLink = await createPaymentLink(discordId, amount, wallet);
  res.json({ paymentLink });
});

// Endpoint to simulate payment confirmation (you'd replace with webhook from Google Pay or processor)
app.post('/payment-callback', async (req, res) => {
  const { paymentId } = req.body;

  if (!paymentId) return res.status(400).json({ error: 'Missing paymentId' });

  await handlePaymentConfirmation(paymentId);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`CJS backend running on http://localhost:${PORT}`);
});
