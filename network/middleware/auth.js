const authenticate = (req, res, next) => {
    if (token.valid(req.headers['x-access-token'])) next();
    else res.status(401).send({ status: 401, message: 'Invalid Access Token'});
}

module.exports = authenticate;
