const fetch = require('node-fetch');
const { fetchOptions } = require('../../tools')
const { SET_KNOWN_HOSTS, SET_CHUNK_LOG } = require('../actions');


const send = (state, action) => {
    const ignoredActionTypes = [
        SET_KNOWN_HOSTS, SET_CHUNK_LOG
    ];
    if (!action.type.includes('_FROM_PEER') && !ignoredActionTypes.includes(action.type)) {
      let known_hosts = state.known_hosts || [];
      if (known_hosts.length > 0) {
          known_hosts.forEach(host => {
              console.log(`sending ${action.type} to http://${host.ip}:${process.env.PORT}/actionfrompeer`);
              fetch(
                  `http://${host.ip}:${process.env.PORT}/actionfrompeer`,
                  fetchOptions(null, 'POST', action)
              )
              .then(response => console.log(response))
              .catch(error => error);
          });
      }
    }
    return action;
};

module.exports = send;
