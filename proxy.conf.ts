/*
 * @Author: pmx
 * @Date: 2022-11-03 09:56:29
 * @Last Modified by: zzl
 * @Last Modified time: 2023-06-30 14:11:15
 */
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
];

module.exports = PROXY_CONFIG;
