const node_info = require('./node_info');
const user = require('./user');
const known_hosts = require('./known_hosts');


const reducer = (state={}, action) => ({
  node_info: node_info(state.node_info, action),
  user: user(state.user, action),
  known_hosts: known_hosts(state.known_hosts, action)
});

module.exports = reducer;
