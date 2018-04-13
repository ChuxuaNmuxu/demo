const express = require('express');

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('test api');
  res.send({ message: 'Hello from REST API' });
});

module.exports = router;
