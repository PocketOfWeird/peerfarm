const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const authenticate = require('./middleware/auth');
const manager = require('../data/state_manager');
const app = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(authenticate);

app.post('/actionfrompeer', (req, res) => {
    let action = req.body;
    action.type += '_FROM_PEER';
    manager.dispatchFromPeer(action);
    res.send({ status: 200, message: 'Success' });
});

app.listen(process.env.PORT, () => console.log('Server listening on', process.env.PORT));
