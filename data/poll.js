const maya = require('../tools/maya');
const actions = require('./actions');

const poller = (manager, property, cb) => {
  let interval = 3000;
  setInterval(function () {
    let state = manager.getState(property);
    cb(state);
  }, interval);
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
                console.error(`Renderer exited with error code ${info} and\nerror signal ${errInfo}`);
              } else {
                manager.dispatch(actions.completeChunk(id));
                console.log(`Renderer exited with code ${info}`);
              }
              return;
            }
            if (error) {
              manager.dispatch(actions.errorChunk(id));
              console.error(error);
            }
            if (errInfo) {
              // TODO: Figure out where to do with this info
              console.log('Error from Renderer:\n', errInfo);
            }
            if (info) {
              // TODO: Figure out where to do with this info
              console.log('Info from Renderer:\n', info);
            }
          });
        }
      }
    }
  });
}

module.exports = {
  pollForChunks
};
