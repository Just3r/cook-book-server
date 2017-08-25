import Dish from '../models/dish.model';
import serialize from '../middlewares/serialize';
import APIError from '../helpers/APIError';
import httpStatus from 'http-status';
/**
 * Load dish and append to req.
 */


/**
 * Get dish
 * @returns {dish}
 */
const get = (req, res, next) => {
  const {id} = req.params
  Dish.findById(id).populate('ingridients').deepPopulate('dishParent', 'dishParent.ingridients')
    .then(response => {
      res.json(serialize(response))
    })
    .catch(err => {
      const error = new APIError('No such item exists!', httpStatus.NOT_FOUND);
      return Promise.reject(err);
    })
}



/**
 * Create new dish
 * @property {string} req.body.dishName - The name of dish.
 * @property {number} req.body.ingridients - The ingridients of dish.
 * @returns {dish}
 */

const  create = (req, res, next) => {
  const { name, ingridients, dishParent } = req.body
  const dish = new Dish({
     name,
     ingridients,
     dishParent
  });
   dish.save()
    .then(savedDish => res.json(serialize(savedDish)))
    .catch(e => next(e));
}

/**
 * Update existing ingridient
 * @property {string} req.body.dishName - The name of dish.
 * @property {number} req.body.ingridients - The ingridients of dish.
 * @returns {dish}
 */

const update = (req, res, next) => {
  const {id} = req.params
  const {name, ingridients} = req.body
  const data = {name, ingridients, updatedAt: new Date()}
  Dish.findByIdAndUpdate(id, {$set: data },{ new: true}).then(data => {
    res.json(serialize(data)) 
  })
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of dishs to be skipped.
 * @property {number} req.query.limit - Limit number of dishs to be returned.
 * @returns {dish[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;
  Dish.list({ limit, skip })
    .then(dishes => res.json(serialize(dishes)))
    .catch(e => next(e));
}

/**
 * Delete dish.
 * @returns {dish}
 */
const remove = (req, res, next) => {
  const {id} = req.params
  let result = _remove(id)
  Promise.all([...result]).then(r=>{
    res.json(r)
  })
  
}

const  _remove = (id) =>{
  let childrenPromise = findChildren(id)
  return childrenPromise
    .then(children => {
      if(!children.length){
        return Dish.findByIdAndRemove(id)
      }else {
        return Dish.findByIdAndRemove(id).then( () => {
          return children.map((child) =>_remove(child._id))
        })
      }
    })
}

const findChildren = (id) => {
  return Dish.find({dishParent: id})
}

export default { get, create, update, list, remove };

