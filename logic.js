require('./network/server');
const networkClient = require('./network/client');
const manager = require('./data/state_manager');
const actions = require('./data/actions');
const { pollForChunks } = require('./data/poll');

networkClient.getKnownNodes().then(() => manager.dispatch(actions.setNodeInfo()));
pollForChunks(manager);

// testing only
const maya = require('./tools/maya');
const uuidV4 = require('uuid/v4');
let settings = maya.settings(
  uuidV4(),
  1,
  400,
  '\\\\art-render\\RenderShare\\Hartzler\\PeerTest',
  '\\\\art-render\\RenderShare\\Hartzler\\PeerTest\\scenes\\test.mb',
  '\\\\art-render\\RenderShare\\Hartzler\\PeerTest\\images',
  'exr',
  'perspShape1'
);
manager.dispatch(actions.submitRender(settings, 5));
