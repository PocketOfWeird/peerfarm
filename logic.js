require('./network/server');
const networkClient = require('./network/client');
const manager = require('./data/state_manager');
const actions = require('./data/actions');

networkClient.getKnownNodes().then(() => manager.dispatch(actions.setNodeInfo()));

//testing only
const maya = require('./tools/maya');
let settings = maya.settings(
  1,
  400,
  '\\\\art-render\\RenderShare\\Hartzler\\PeerTest',
  '\\\\art-render\\RenderShare\\Hartzler\\PeerTest\\scenes\\test.mb',
  '\\\\art-render\\RenderShare\\Hartzler\\PeerTest\\images',
  'exr',
  'persp'
);
manager.dispatch(actions.submitRender(settings, 5));
