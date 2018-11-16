const { SET_KNOWN_HOSTS, SET_NODE_INFO_FROM_PEER } = require('../actions');


const known_hosts = (state=[], action) => {
  switch (action.type) {
    case SET_KNOWN_HOSTS:
        return action.payload;
    case SET_NODE_INFO_FROM_PEER:
        let newState = state.filter(host => host.ip !== action.payload.ip);
        newState.push(action.payload);
        console.log(newState);
        return newState;
    default:
      return state;
  }
}

module.exports = known_hosts;
