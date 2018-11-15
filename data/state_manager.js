const db = require('./local_db');
const uuidV4 = require('uuid/v4');
const reducer = require('./reducer');
const middleware = require('./middleware');


const getState = top_level_property => {
  if (!top_level_property) return db.getState();
  return db.get(top_level_property).value();
}

const dispatch = passedAction => {
  const state = db.getState();
  const action = middleware(state, passedAction)
  const newState = reducer(state, action);
  db.setState(newState);
  db.write();
}

module.exports = {
  getState,
  dispatch
};
