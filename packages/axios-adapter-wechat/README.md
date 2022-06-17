# axios-adapter-wechat

## 使用方式

```bash
$ yarn add axios-adapter-wechat
# or
$ npm install axios-adapter-wechat --save-dev
```

```javascript

// 判断小程序环境

import axios, { AxiosAdapter } from 'axios';
import wechatAdapter from 'axios-adapter-wechat';
if (typeof wx !== 'undefined' && !!wx?.request && Object.prototype.toString.call(wx?.request) === '[object Function]') {
  // 用来判断是否小程序环境 默认 timeout = 15s
  axios.defaults.adapter = wechatAdapter as AxiosAdapter;
}
```