import Joi from 'joi';

export default {

  // POST /api/dishes
    createDish: {
      body: {
        name: Joi.string().required()
      }
    },
  // UPDATE /api/dishes/:dishId
    updateDish: {
      body: {
        name: Joi.string().required()
      }
    },
     // POST /api/dishes
     createSubDish: {
      body: {
        name: Joi.string().required()
      }
    },
  // UPDATE /api/dishes/:dishId
    updateSubDish: {
      body: {
        name: Joi.string().required()
      }
    },

    // POST /api/dishes
  createIngridient: {
      body: {
        name: Joi.string().required(),
        calories: Joi.number().required()
      }
    },
  // UPDATE /api/dishes/:dishId
    updateIngridient: {
      body: {
        name: Joi.string().required(),
        calories: Joi.number().required()
      }
    }
};
