(function(){
  const Vue = require('vue/dist/vue');
  const ipc = require('electron').ipcRenderer;
  const manager = require('./data/state_manager');
  let app;


  function hideLoadingIcon() {
    let loading = document.querySelector('#loading');
    loading.style.display = 'none';
  }

  function initApp() {
    ipc.once('state', (event, state) => {
      app = new Vue({
        el: '#app',
        data: state,
        computed: {
          peers: function() {
            return this.known_hosts.filter(peer => !peer.authority);
          },
          hasPeers: function() {
            return this.peers.length > 0 ? true : false
          }
        }
      });
    });
    ipc.send('getState');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initApp();
    hideLoadingIcon();
  });
})();
