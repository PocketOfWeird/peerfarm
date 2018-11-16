const jwt = require('jsonwebtoken');


const create = data => jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1min' });

const valid = token => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true
    } catch (e) {
        return false;
    }
}

module.exports = {
    create,
    valid
};
