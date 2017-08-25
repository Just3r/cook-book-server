import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import autoPopulate from 'mongoose-autopopulate';
import deepPopulate from 'mongoose-deep-populate';



/**
 * Dish Schema
 */
const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingridients: [{
    ref: 'Ingridient',
    type: mongoose.Schema.Types.ObjectId
  }],
  dishParent: {
    ref: 'Dish',
    type:mongoose.Schema.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},{
  timestamps: true
});
DishSchema.plugin(deepPopulate(mongoose), {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
DishSchema.method({
});

/**
 * Statics
 */
DishSchema.statics = {
  /**
   * Get dish
   * @param {ObjectId} id - The objectId of dish.
   * @returns {Promise<Dish, APIError>}
   */
  get(id) {
    return this.findOne({_id:id})
      .exec()
      .then((dish) => {
        if (dish) {
          return dish;
        }
        const err = new APIError('No such dish exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Dishes in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Dishes to be skipped.
   * @param {number} limit - Limit number of Dishes to be returned.
   * @returns {Promise<Dish[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .populate('ingridients')
      .sort({ createdAt: +1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Dish
 */
export default mongoose.model('Dish', DishSchema);
