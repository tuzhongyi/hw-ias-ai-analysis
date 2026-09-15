const PROXY_CONFIG = [
  {
    context: ['/api/ver10/'],
    target: 'https://garbage01.51hws.cn:5443',
    changeOrigin: true,

    secure: false,
    headers: {
      Connection: 'keep-alive',
    },
  },
  {
    context: ['/video/wsplayer/'],
    target: 'https://garbage01.51hws.cn:5443',
    changeOrigin: true,

    secure: false,
    headers: {
      Connection: 'keep-alive',
    },
  },
];

module.exports = PROXY_CONFIG;
