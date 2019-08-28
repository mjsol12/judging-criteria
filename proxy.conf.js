const PROXY_CONFIG = {
  "/api": {
    "target": "http://localhost:7200",
    "secure": false
  }
};

module.exports = PROXY_CONFIG;
