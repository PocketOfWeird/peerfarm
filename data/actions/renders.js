const maya = require('../../tools/maya');

const SUBMIT_RENDER = 'SUBMIT_RENDER';
const CANCEL_RENDER = 'CANCEL_RENDER';
const COMPLETE_RENDER = 'COMPLETE_RENDER';
const DELETE_RENDER = 'DELETE_RENDER';

const submitRender = (settings, chunkSize) => {
  const chunks = maya.splitIntoChunks(settings, chunkSize);
  return {
    type: SUBMIT_RENDER,
    payload: {
      chunks,
      settings
    }
  };
}

const cancelRender = id => ({
  type: CANCEL_RENDER,
  payload: id
});

const completeRender = id => ({
  type: COMPLETE_RENDER,
  payload: id
});

const deleteRender = id => ({
  type: DELETE_RENDER,
  payload: id
});

module.exports = {
  SUBMIT_RENDER,
  CANCEL_RENDER,
  COMPLETE_RENDER,
  DELETE_RENDER,
  submitRender,
  cancelRender,
  completeRender,
  deleteRender
};
