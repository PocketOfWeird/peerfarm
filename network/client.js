const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const manager = require('../data/state_manager');
const actions = require('../data/actions');
const token = require('../data/token');


const getKnownNodes = () => fetch(`${process.env.AUTHORITY}/knownhosts`, {
                            method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token()}`;
                            },
                            credentials: 'include',
                            body: JSON.stringify({ manager.getState('node_info') })
                        })
                        .then(response => response.json())
                        .then(json => manager.dispatch(actions.setKnownHosts(json.data)))
                        .catch(error => console.error(error));

const sendActionToKnownNodes = action => {
  /*for ...*/
}

module.exports = {
  getKnownNodes,
  sendActionToKnownNodes
};
