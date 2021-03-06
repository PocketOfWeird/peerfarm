const ipc = require('electron').ipcMain;
require('./network/server');
const networkClient = require('./network/client');
const manager = require('./data/state_manager');
const actions = require('./data/actions');
const { pollForMayaRender, pollForChunks } = require('./data/poll');

networkClient.getKnownNodes().then(() => manager.dispatch(actions.setNodeInfo()));
//pollForMayaRender(manager);
pollForChunks(manager);

const attachActionsToWindow = win => {
  manager.setWindow(win.webContents);
}

ipc.on('getState', (event, arg) => {
  event.sender.send('state', manager.getState());
});

/*
// testing only
const maya = require('./tools/maya');
const uuidV4 = require('uuid/v4');
let settings = maya.settings(
  uuidV4(),
  2,
  120,
  '\\\\art-render\\RenderShare\\Goodwin\\OceanSimulation',
  '\\\\art-render\\RenderShare\\Goodwin\\OceanSimulation\\scenes\\FX_BOSS_Ocean.0006.mb',
  '\\\\art-render\\RenderShare\\Goodwin\\OceanSimulation\\images\\test03',
  'exr',
  'perspShape'
);
manager.dispatch(actions.submitRender(settings, 5));
*/
module.exports = {
  attachActionsToWindow
};
