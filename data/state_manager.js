const db = require('./local_db');
const uuidV4 = require('uuid/v4');
const reducer = require('./reducer');
const middleware = require('./middleware');


const getState = top_level_property => {
  if (!top_level_property) return db.getState();
  return db.get(top_level_property).value();
}

const dispatch = (action, fromPeer) => {
  if (fromPeer) action.type += '_FROM_PEER';
  const state = db.getState();
  const newState = reducer(state, middleware(state, action, dispatch));
  db.setState(newState);
  db.write();
  return;
}

module.exports = {
  getState,
  dispatch
};
