const find = require('find-process');
const maya = require('../tools/maya');
const actions = require('./actions');

const poller = (manager, property, cb) => {
  let interval = 3000;
  setInterval(function () {
    let state = manager.getState(property);
    cb(state);
  }, interval);
}

const pollForMayaBatch = (manager) => {
  setInterval(function () {
    find('name', 'MayaBatch', true)
    .then(function (list) {
      if (list.length < 1) {
        manager.dispatch(actions.notRendering());
      }
    });
  }, 3000);
}

const pollForChunks = (manager) => {
  poller(manager, 'currentlyRendering', currentlyRendering => {
    if (!currentlyRendering) {
      let chunks = manager.getState('chunks');
      if (chunks) {
        const pendingChunks = Object.entries(chunks).filter(c => c[1].pending);
        if (pendingChunks.length > 0) {
          const chunk = pendingChunks[0][1];
          const id = chunk.chunkId;
          manager.dispatch(actions.startChunk(id));
          maya.startChunk(chunk, (error, errInfo, info, done) => {
            if (done) {
              if (errInfo) {
                manager.dispatch(actions.errorChunk(id));
                manager.dispatch(actions.setChunkLog(id, `<error>Renderer exited with error code ${info} and error signal ${errInfo}</error>`));
              } else {
                manager.dispatch(actions.completeChunk(id));
                manager.dispatch(actions.setChunkLog(id, `<info>Renderer exited with code ${info}</info>`));
              }
              return;
            }
            if (error) {
              manager.dispatch(actions.errorChunk(id));
              manager.dispatch(actions.setChunkLog(id, `<error>${error}</error>`));
            }
            if (errInfo) {
              manager.dispatch(actions.setChunkLog(id, `<error>${errInfo}</error>`));
            }
            if (info) {
              manager.dispatch(actions.setChunkLog(id, `<info>${info}</info>`));
            }
          });
        }
      }
    }
  });
}

module.exports = {
  poller,
  pollForMayaBatch,
  pollForChunks
};
