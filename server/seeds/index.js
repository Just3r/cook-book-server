import mongoose from 'mongoose';
import Promise from 'bluebird';
import config from '../../config/config';
import seedIngridients from './ingridients';
import dishesSeed from './dishes';

mongoose.Promise = Promise;
mongoose.connect(config.mongo.host);

mongoose.connection.on('error', function onConnectionError(error) {
  console.error('db error:', error.stack)
});


mongoose.connection.once('open', function (callback) {
  console.log('db connected');
  seedIngridients()
      .then(()=> dishesSeed())
      .then(()=> {
        mongoose.connection.close()
        console.log('db disconnected')
      })
      .catch(e => console.error(e))
  })






