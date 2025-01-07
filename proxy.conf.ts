const PROXY_CONFIG = [
  {
    context: ['/api/ver10/', '/main/'],
    target: 'http://192.168.18.147:9000',
    changeOrigin: true,

    secure: false,
    headers: {
      Connection: 'keep-alive',
    },
  },
];

module.exports = PROXY_CONFIG;
