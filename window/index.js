
  const Vue = require('vue/dist/vue');
  const manager = require('./data/state_manager');
  function hideLoadingIcon() {
    let loading = document.querySelector('#loading');
    loading.style.display = 'none';
  }

  function createTableData (data) {
    let td = document.createElement('td');
    td.innerText = data;
    return td;
  }

  function updatePeers(app) {
    setInterval(() => {
      app.peers = manager.getState('known_hosts').filter(peer => !peer.authority);
      if (app.peers.length > 0) app.hasPeers = true;
    }, 2000);
  }

  function updateRenders(app) {
    setInterval(() => {
      app.renders = Object.values(manager.getState('renders'));
    }, 2010)
  }

  function initApp() {
    let app = new Vue({
      el: '#app',
      data: {
        peers: [],
        hasPeers: false,
        renders: [],
      }
    });
    return app;
  }

  document.addEventListener('DOMContentLoaded', () => setTimeout(() => {
    let app = initApp();
    hideLoadingIcon();
    updatePeers(app);
    updateRenders(app);
  }, 1250));
