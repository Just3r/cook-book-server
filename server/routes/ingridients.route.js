import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import ingridientCtrl from '../controllers/ingridient.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/ingridients - Get list of ingridients */
  .get(ingridientCtrl.list)

  /** POST /api/ingridients - Create new ingridient */
  .post(validate(paramValidation.createIngridient), ingridientCtrl.create);

router.route('/:id')
  /** GET /api/ingridients/:id - Get ingridient */
  .get(ingridientCtrl.get)

  /** PUT /api/ingridients/:id - Update ingridient */
  .put(validate(paramValidation.updateIngridient), ingridientCtrl.update)

  /** DELETE /api/ingridients/:id - Delete ingridient */
  .delete(ingridientCtrl.remove);


export default router;
