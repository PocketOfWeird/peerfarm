const os = require('os');
const ip = require('ip');


const SET_NODE_INFO = 'SET_NODE_INFO';
const SET_NODE_INFO_FROM_PEER = 'SET_NODE_INFO_FROM_PEER';
const SET_USER = 'SET_USER';
const SET_KNOWN_HOSTS = 'SET_KNOWN_HOSTS';

const setNodeInfo = () => ({
  type: SET_NODE_INFO,
  payload: {
    hostname: os.hostname(),
    ip: ip.address(),
    type: os.type(),
    cpus: os.cpus(),
    mem: os.totalmem(),
    uptime: os.uptime()
  }
});

const setUser = () => ({
  type: SET_USER,
  payload: os.userInfo().username
});

const setKnownHosts = data => ({
  type: SET_KNOWN_HOSTS,
  payload: data
});

module.exports = {
  SET_NODE_INFO,
  SET_NODE_INFO_FROM_PEER,
  SET_USER,
  SET_KNOWN_HOSTS,
  setNodeInfo,
  setUser,
  setKnownHosts
};
