const os = require('os');


const SET_USER = 'SET_USER';

const setUser = () => ({
  type: SET_USER,
  payload: os.userInfo().username
});

module.exports = {
  SET_USER,
  setUser
};
