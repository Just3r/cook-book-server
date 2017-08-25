import Ingridient from '../models/ingridient.model';
import APIError from '../helpers/APIError';
import httpStatus from 'http-status';
import serialize from '../middlewares/serialize';
import Dish from '../models//dish.model';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId

/**
 * Get ingridient
 * @returns {Ingridient}
 */
const get = (req, res, next) => {
  const {id} = req.params
  Ingridient.findById(id)
    .then(response => {
      res.json(serialize(response))
    })
    .catch(err => {
      const error = new APIError('No such item exists!', httpStatus.NOT_FOUND);
      return Promise.reject(err);
    })
}

/**
 * Create new ingridient
 * @property {string} req.body.ingridientName - The name of ingridient.
 * @property {number} req.body.calories - The calories of ingridient.
 * @returns {Ingridient}
 */
const create = (req, res, next) => {
  const { name, calories } = req.body
  const ingridient = new Ingridient({
    name: name,
    calories: calories,
    cretedAt: new Date(),
    updatedAt: new Date()
  });
  ingridient.save()
    .then(savedIngridient => res.json(savedIngridient))
    .catch(error => {
      res.json(serialize(error))
    })
}

/**
 * Update existing user
 * @property {string} req.body.ingridientName - The name of ingridient.
 * @property {number} req.body.calories - The calories of ingridient.
 * @returns {Ingridient}
 */
const update = (req, res, next) => {
  const {id} = req.params
  const {name, calories } = req.body
  Ingridient.findByIdAndUpdate(id, {$set: { name, calories, updatedAt: new Date()}},{ new: true})
    .then(data => {
      res.json(serialize(data)) 
    })
    .catch(error => {
      res.json(serialize(error))
    })
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of ingridients to be skipped.
 * @property {number} req.query.limit - Limit number of ingridients to be returned.
 * @returns {Ingridient[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;
  Ingridient.list({ limit, skip })
    .then(ingridients => res.json(serialize(ingridients)))
    .catch(error => {
      res.json(serialize(error))
    })
}

/**
 * Delete ingridient.
 * @returns {Ingridient}
 */
const remove = (req, res, next) => {
  const {id} = req.params
  Ingridient.findByIdAndRemove(id)
    .then( data => {
      Dish.find({ingridients:{ $in: [ObjectId(data._id)]}})
        .then(dishes => {
          return Promise.all(dishes.map(d => {
            let ingridients = d.ingridients.filter( ingridient =>  String(ingridient) !== String(data._id))
            return Dish.findOneAndUpdate({_id:d._id}, {ingridients:[...ingridients]})
          }))
        })
        .then(response => res.json(serialize(response)))
    })
    .catch(error => {
      res.json(serialize(error))
    })
}


export default {  get, create, update, list, remove };
