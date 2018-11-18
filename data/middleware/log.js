const fetch = require('node-fetch');
const { fetchOptions } = require('../../tools');
const { GET_CHUNK_LOG, sendChunkLog } = require('../actions');


const log = (state, action) => {
    if (action.type === GET_CHUNK_LOG + '_FROM_PEER') {
        fetch(
            `http://${payload.ip}:${process.env.PORT}/actionfrompeer`,
            fetchOptions(null, 'POST', sendChunkLog(state, payload.id))
        )
        .then(response => response)
        .catch(error => error);
    }
    console.log(action);
    return action;
}
