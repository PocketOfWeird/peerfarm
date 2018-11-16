const send = require('./send');


const middleware = (state, action) => {
  return send(state, action);
  // if more middleware needed, it would look like:
  // return anotherMiddleWare(state, send(action));
}

module.exports = middleware;
