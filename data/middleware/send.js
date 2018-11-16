const fetch = require('node-fetch');
const { fetchOptions } = require('../../tools')


const send = (state, action) => {
    const ignoredActionTypes = [

    ];
    if (!ignoredActionTypes.includes(action.type)) {
        let known_hosts = state.known_hosts || [];
        if (known_hosts.length > 0) {
            known_hosts.forEach(host => {
                fetch(
                    `http://${host.ip}:${process.env.PORT}/actionfrompeer`,
                    fetchOptions(null, 'POST', action)
                )
                .then(response => console.log(response.json()))
                .catch(error => console.error(error));
            });
        }
    }
    return action;
};

module.exports = send;
