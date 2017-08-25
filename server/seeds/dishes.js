import Dish from '../../server/models/dish.model';
import Ingridient from '../../server/models/ingridient.model';
let dishesSeed = () => {
    return Dish.remove({}).then(() => {
      return Ingridient.find({}).then(data => {
        return Promise.all(data.map(ingridient => Dish.collection.insert({name:`${ingridient.name}-dish`, ingridients:[ingridient._id]})))
      })
    }).then(res => {
        console.log('Dishes inserted.');
        return res
    })
  };
  
  export default dishesSeed;