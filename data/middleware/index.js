const send = require('./send');


const middleware = (state, passedAction) => {
  const action = send(state, passedAction);
  // if more middleware needed, it would look like:
  // const action = anotherMiddleWare(state, send(passedAction));
  return action;
}

module.exports = middleware;
