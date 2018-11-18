const START_CHUNK = 'START_CHUNK';
const CANCEL_CHUNK = 'CANCEL_CHUNK';
const ERROR_CHUNK = 'ERROR_CHUNK';
const COMPLETE_CHUNK = 'COMPLETE_CHUNK';
const SET_CHUNK_LOG = 'SET_CHUNK_LOG';
const GET_CHUNK_LOG = 'GET_CHUNK_LOG';

const startChunk = id => ({
  type: START_CHUNK,
  payload: id
});

const cancelChunk = id => ({
  type: CANCEL_CHUNK,
  payload: id
});

const errorChunk = (id, message) => ({
  type: ERROR_CHUNK,
  payload: {
    id,
    message
  }
});

const completeChunk = id => ({
  type: COMPLETE_CHUNK,
  payload: id
});

const setChunkLog = (id, log) => ({
    type: SET_CHUNK_LOG,
    payload: {
        id,
        log
    }
});

const getChunkLog = (state, id) => ({
    type: GET_CHUNK_LOG,
    payload: {
        ip: state.node_info.ip,
        id
    }
});

const sendChunkLog = (state, id) => ({
    type: SET_CHUNK_LOG,
    payload: {
        id,
        log: state.chunks[id].log
    }
});

module.exports = {
  START_CHUNK,
  CANCEL_CHUNK,
  ERROR_CHUNK,
  COMPLETE_CHUNK,
  SET_CHUNK_LOG,
  GET_CHUNK_LOG,
  startChunk,
  cancelChunk,
  errorChunk,
  completeChunk,
  setChunkLog,
  getChunkLog,
  sendChunkLog
};
