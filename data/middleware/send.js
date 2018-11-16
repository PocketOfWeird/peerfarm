const fetch = require('node-fetch');
const { fetchOptions } = require('../../tools')
const { SET_KNOWN_HOSTS, SUBMIT_RENDER } = require('../actions');


const send = (state, action) => {
    const ignoredActionTypes = [
        SET_KNOWN_HOSTS, SUBMIT_RENDER
    ];
    if (!ignoredActionTypes.includes(action.type) || action.type.includes('_FROM_PEER')) {
        let known_hosts = state.known_hosts || [];
        if (known_hosts.length > 0) {
            known_hosts.forEach(host => {
                fetch(
                    `http://${host.ip}:${process.env.PORT}/actionfrompeer`,
                    fetchOptions(null, 'POST', action)
                )
                .then(response => response)
                .catch(error => error);
            });
        }
    }
    return action;
};

module.exports = send;
