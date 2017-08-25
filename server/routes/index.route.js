import express from 'express';
import dishRoutes from './dishes.route';
import ingridientRoutes from './ingridients.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);


router.use('/dishes', dishRoutes);


router.use('/ingridients', ingridientRoutes);

export default router;
