const express = require('express');
const router = express.Router();

router.post('/order', (req, res) => {
  const { firstName, lastName, address, items } = req.body;

  if (!firstName || !lastName || !address || items.length === 0) {
    return res.status(400).send({ message: 'All fields and cart items are required' });
  }

  console.log('Order Placed:', { firstName, lastName, address, items });
  res.json({ message: 'Order placed successfully!' });
});

module.exports = router;
