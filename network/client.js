const fetch = require('node-fetch');
const manager = require('../data/state_manager');
const actions = require('../data/actions');
const { fetchOptions } = require('../tools');


const getKnownNodes = () => {
    manager.dispatch(actions.setNodeInfo());
    let node_info = manager.getState('node_info');
    fetch(
        `${process.env.AUTHORITY}/knownhosts`,
         fetchOptions(node_info)
     )
     .then(response => response.json())
     .then(json => {
         manager.dispatch(actions.setKnownHosts(json.data));
     })
     .catch(error => console.error(error));
}

module.exports = {
  getKnownNodes
};
