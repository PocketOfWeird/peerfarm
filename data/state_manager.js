const db = require('./local_db');
const reducer = require('./reducer');
const middleware = require('./middleware');
let win;

const getState = top_level_property => {
  if (!top_level_property) return db.getState();
  return db.get(top_level_property).value();
}

const setState = newState => {
  db.setState(newState);
  db.write();
  //state = newState;
}

const dispatch = (action, fromPeer) => {
  if (fromPeer) action.type += '_FROM_PEER';
  const state = db.getState();
  const newState = reducer(state, middleware(state, action));
  setState(newState);
  if (win) {
    win.send('state', state);
  }
  //console.log('newState:', state);
  return;
}

const setWindow = winInstance => {
  win = winInstance;
}

module.exports = {
  getState,
  setState,
  dispatch,
  setWindow
};
