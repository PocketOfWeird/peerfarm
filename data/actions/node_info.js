const os = require('os');
const ip = require('ip');
const { machineIdSync } = require('node-machine-id');


const SET_NODE_INFO = 'SET_NODE_INFO';

const setNodeInfo = () => ({
  type: SET_NODE_INFO,
  payload: {
    id: machineIdSync({original: true}),
    hostname: os.hostname(),
    ip: ip.address(),
    type: os.type(),
    cpus: os.cpus(),
    mem: os.totalmem(),
    uptime: os.uptime()
  }
});

module.exports = {
  SET_NODE_INFO,
  setNodeInfo
};
