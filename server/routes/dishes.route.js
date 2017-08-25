import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import dishCtrl from '../controllers/dish.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/dishes - Get list of dishes */
  .get(dishCtrl.list)

  /** POST /api/dishes - Create new dish */
  .post(validate(paramValidation.createDish), dishCtrl.create);

router.route('/:id')
  /** GET /api/dishes/:id - Get dish */
  .get(dishCtrl.get)

  /** PUT /api/dishes/:id - Update dish */
  .put(validate(paramValidation.updateDish), dishCtrl.update)

  /** DELETE /api/dishes/:id - Delete dish */
  .delete(dishCtrl.remove);

export default router;
