const { sendActionToKnownNodes } = require('../../network/client');


const send = (state, action) => {
  sendActionToKnownNodes(action);
  return action;
};

module.exports = send;
