const START_CHUNK = 'START_CHUNK';
const CANCEL_CHUNK = 'CANCEL_CHUNK';
const ERROR_CHUNK = 'ERROR_CHUNK';
const COMPLETE_CHUNK = 'COMPLETE_CHUNK';

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

module.exports = {
  START_CHUNK,
  CANCEL_CHUNK,
  ERROR_CHUNK,
  COMPLETE_CHUNK,
  startChunk,
  cancelChunk,
  errorChunk,
  completeChunk
};
