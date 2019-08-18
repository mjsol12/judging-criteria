const Logger = {
  info: function (msg) {
    console.log(new Date() + ' - INFO: ', msg);
  },
  error: function (msg) {
    console.error(new Date() + ' - ERROR: ', msg);
  }
};

export default Logger;
