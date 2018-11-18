//const db = require('./local_db');
const uuidV4 = require('uuid/v4');
const reducer = require('./reducer');
const middleware = require('./middleware');
let state = {};

const getState = top_level_property => {
  if (!top_level_property) return state;//db.getState();
  return state[top_level_property];//db.get(top_level_property).value();
}

const setState = newState => {
  //db.setState(state);
  //db.write();
  state = newState;
}

const dispatch = (action, fromPeer) => {
  if (fromPeer) action.type += '_FROM_PEER';
  //const state = db.getState();
  const newState = reducer(state, middleware(state, action));
  setState(newState);
  return;
}

module.exports = {
  getState,
  setState,
  dispatch
};
