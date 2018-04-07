import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.send({ message: 'Hello from REST API' });
});

export default router;
