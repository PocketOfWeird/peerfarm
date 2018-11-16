const token = require('../data/token');


const fetchOptions = (tokenData, type, body) => {
    let options = {
        method: type || 'GET',
        headers: {
            'x-access-token': token.create(tokenData || { nothing: true }),
        }
    };
    if (type === 'POST') {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }
    return options;
};

module.exports = {
    fetchOptions
};
