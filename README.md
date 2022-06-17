# axios-adapter-miniprogram

## 使用方式
### axios-adapter-wechat

根据`Axios`适配了微信小程序`wx.request`没有进行环境的判断

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

### axios-adapter-miniprogram

根据`axios-adapter-wechat`集成了微信小程序环境判断，直接引用即可，其他的与`Axios`保持一致

```bash
$ yarn add axios-adapter-miniprogram
# or
$ npm install axios-adapter-miniprogram --save-dev
```


```javascript
import axios from 'axios-adapter-miniprogram';
```

## 为什么要写这个库

* 现在小程序的开发越来越多，每个小程序在网络请求方面都有官方自己的实现，但是不论在请求参数还是返回属性甚至使用习惯上，都不是很统一
* 希望和h5、pc、node端上进行对齐
* 相对来说有稍微看过axios的源码，而且axios的普及率比较高，如果和axios对齐，大家都比较熟悉，好上手
* 希望通过这个库来让开发人员不论从使用习惯，api调用都和其他端对齐，在网络请求这个节点上磨平不同端所带来的影响

## 解决方案

1. 使用Axios并扩展Axios的adapter方法
2. [Axios](https://www.axios-http.cn/docs/intro)

## 新手上路

1. 基于Axios的adapter方法兼容原生wx小程序网络请求(没有使用除axios以外第三方包)
2. 兼容网络请求API与Axios一致，具体调用文档看Axios官网
3. 返回字段与Axios保持一致，这里没有使用wx小程序返回的原生字段，方便后续其他端网络请求的扩展
4. 目前仅扩展wx小程序网路请求


## 于axios不同的地方

* 微信的form表单提交[使用wx.request发送multipart/form-data请求的方法](https://developers.weixin.qq.com/community/develop/article/doc/0000cc0e5bc5d093c6f8be17254c13)


