const { SET_KNOWN_HOSTS } = require('../actions');


const known_hosts = (state=[], action) => {
  switch (action.type) {
    case SET_KNOWN_HOSTS:
        console.log('set known hosts reducer:', action.payload);
      return action.payload;
    default:
      return state;
  }
}

module.exports = known_hosts;
