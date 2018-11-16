const os = require('os');
const ip = require('ip');
const maya = require('../../tools/maya');

const SET_NODE_INFO = 'SET_NODE_INFO';
const SET_NODE_INFO_FROM_PEER = 'SET_NODE_INFO_FROM_PEER';
const SET_USER = 'SET_USER';
const SET_KNOWN_HOSTS = 'SET_KNOWN_HOSTS';
const SUBMIT_RENDER = 'SUBMIT_RENDER';

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

const submitRender = (settings, chunkSize) => {
  const chunks = maya.splitIntoChunks(settings, chunkSize);
  // testing only
  maya.startRender(chunks[0], (error, errInfo, info, done) => {
    if (error) {
      console.error(error);
    }
    if (errInfo) {
      console.log('Error from Renderer:\n', errInfo);
    }
    if (errInfo) {
      console.log('Info from Renderer:\n', info);
    }
    if (done) {
      if (errInfo) {
        console.error(`Renderer exited with error code ${info} and\nerror signal ${errInfo}`);
      } else {
        console.log(`Renderer exited with code ${info}`);
      }
    }
  });
  return {
    type: SUBMIT_RENDER,
    payload: chunks
  };
}

module.exports = {
  SET_NODE_INFO,
  SET_NODE_INFO_FROM_PEER,
  SET_USER,
  SET_KNOWN_HOSTS,
  SUBMIT_RENDER,
  setNodeInfo,
  setUser,
  setKnownHosts,
  submitRender
};
