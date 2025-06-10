const { sendCJS } = require('./utils');

// In-memory store for demo (use a real DB in production)
const payments = {};

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

async function createPaymentLink(discordId, amount, wallet) {
  const paymentId = generateId();

  // Save session
  payments[paymentId] = { discordId, amount, wallet, paid: false };

  // Return mock payment page (replace with Google Pay later)
  return `https://your-frontend.com/pay/${paymentId}`;
}

async function handlePaymentConfirmation(paymentId) {
  const session = payments[paymentId];
  if (!session || session.paid) return;

  session.paid = true;

  // Send CJS to Stellar wallet
  await sendCJS(session.wallet, session.amount);

  // Notify user (optional)
  console.log(`✅ Sent ${session.amount} CJS to ${session.wallet}`);
}

module.exports = {
  createPaymentLink,
  handlePaymentConfirmation
};

