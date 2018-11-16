require('./network/server');
const networkClient = require('./network/client');
const manager = require('./data/state_manager');
const actions = require('./data/actions');

networkClient.getKnownNodes().then(() => manager.dispatch(actions.setNodeInfo()));
