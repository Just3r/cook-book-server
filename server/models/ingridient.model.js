import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Ingridient Schema
 */
const IngridientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
IngridientSchema.method({
},
{
  timestamps: true
});

/**
 * Statics
 */
IngridientSchema.statics = {
  /**
   * Get Ingridient
   * @param {ObjectId} id - The objectId of Ingridient.
   * @returns {Promise<Ingridient, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((ingridient) => {
        if (ingridient) {
          return ingridient;
        }
        const err = new APIError('No such ingridient exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  updateById(id){
    return this.findById(id).exec().then(data => {
      console.log(data, '///////')
      return data
    })
  },

  /**
   * List Ingridients in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Ingridients to be skipped.
   * @param {number} limit - Limit number of Ingridients to be returned.
   * @returns {Promise<Ingridient[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ name: +1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Ingridient
 */
export default mongoose.model('Ingridient', IngridientSchema);
