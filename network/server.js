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
    manager.dispatchFromPeer(req.body);
    res.send({ status: 200, message: 'Success' });
});

app.listen(process.env.PORT, () => console.log('Server listening on', process.env.PORT));
