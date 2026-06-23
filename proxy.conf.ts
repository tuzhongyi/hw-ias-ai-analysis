const PROXY_CONFIG = [
  {
    context: ['/api/ver10/'],
    target: 'http://192.168.18.147:9000',
    changeOrigin: true,

    secure: false,
    headers: {
      Connection: 'keep-alive',
    },
  },
  // {
  //   context: ['/video/wsplayer/'],
  //   target: 'http://192.168.21.241:8800',
  //   changeOrigin: true,

  //   secure: false,
  //   headers: {
  //     Connection: 'keep-alive',
  //   },
  // },
  {
    context: ['/video/wsplayer/'],
    target: 'http://192.168.18.147:80',
    changeOrigin: true,

    secure: false,
    headers: {
      Connection: 'keep-alive',
    },
  },
];

module.exports = PROXY_CONFIG;
