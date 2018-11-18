(function(){
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

  function updatePeersTable() {
    setInterval(() => {
      let table = document.querySelector('#peers');
      let peers = manager.getState('known_hosts') || [];
      for (let i = 0; i < peers.length; i++) {
        let peer = peers[i];
        if (!peer.authority) {
          let row = document.createElement('tr');
          row.appendChild(createTableData(peer.hostname))
          row.appendChild(createTableData(peer.ip))
          row.appendChild(createTableData(peer.type))
          row.appendChild(createTableData(peer.cpus.length))
          row.appendChild(createTableData(peer.mem))
          row.appendChild(createTableData(peer.uptime))
          table.appendChild(row);
        }
      };
    }, 2000);
  }

  document.addEventListener('DOMContentLoaded', () => setTimeout(() => {
    hideLoadingIcon();
    updatePeersTable();
  }, 1250));
})();
