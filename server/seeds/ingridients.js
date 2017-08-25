import Ingridient from '../../server/models/ingridient.model';
let ingridientsSeed = () => {
  return Ingridient.remove({}).then(() => {
    var ingridientsData = require('./data/ingridientsData');
    return Ingridient.collection.insertMany(ingridientsData).then(res => {
      console.log('Ingridients inserted.');
      return res
    })
  });
};

export default ingridientsSeed;
