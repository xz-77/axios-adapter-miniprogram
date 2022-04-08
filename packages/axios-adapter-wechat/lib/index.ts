// import axios, { AxiosAdapter } from 'axios';
// import wechatAdapter from './adapter/wechat';

import adapter from "./adapter/wechat";



// if (typeof wx !== 'undefined' && !!wx?.request && Object.prototype.toString.call(wx?.request) === '[object Function]') {
//   // 用来判断是否小程序环境 默认 timeout = 15s
//   axios.defaults.adapter = wechatAdapter as AxiosAdapter;
// }

// export default axios;


export default adapter