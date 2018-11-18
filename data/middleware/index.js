const send = require('./send');
const log = require('./log');


const middleware = (state, action) => {
  return log(state, send(state, action));
}

module.exports = middleware;
