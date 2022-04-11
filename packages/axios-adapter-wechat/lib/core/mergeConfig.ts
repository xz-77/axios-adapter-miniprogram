import { AxiosRequestConfig } from 'axios';
import buildFullPath from 'axios/lib/core/buildFullPath';
import buildURL from 'axios/lib/helpers/buildURL';
import utils from 'axios/lib/utils';
import { btoa } from './btoa';

type Options = Omit<WechatMiniprogram.RequestOption, 'fail' | 'success' | 'complete'> & {
  /** 开发者服务器接口地址 */
  url: string;
  /** HTTP 请求方法
   *
   * 可选值：
   * - 'OPTIONS': HTTP 请求 OPTIONS;
   * - 'GET': HTTP 请求 GET;
   * - 'HEAD': HTTP 请求 HEAD;
   * - 'POST': HTTP 请求 POST;
   * - 'PUT': HTTP 请求 PUT;
   * - 'DELETE': HTTP 请求 DELETE;
   * - 'TRACE': HTTP 请求 TRACE;
   * - 'CONNECT': HTTP 请求 CONNECT; */
  method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  validateStatus: (status: number) => boolean;
};

const defaultConfig: Options = {
  /** 开发者服务器接口地址 */
  url: '',
  /** 请求的参数 */
  data: {},
  /** 返回的数据格式
   *
   * 可选值：
   * - 'json': 返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse;
   * - '其他': 不对返回的内容进行 JSON.parse; */
  dataType: 'json',
  /** 开启 cache
   *
   * 最低基础库： `2.10.4` */
  enableCache: false,
  /** 开启 http2
   *
   * 最低基础库： `2.10.4` */
  enableHttp2: false,
  /** 开启 quic
   *
   * 最低基础库： `2.10.4` */
  enableQuic: false,
  /** 设置请求的 header，header 中不能设置 Referer。
   *
   * `content-type` 默认为 `application/json` */
  header: { 'content-type': 'application/json' },
  /** HTTP 请求方法
   *
   * 可选值：
   * - 'OPTIONS': HTTP 请求 OPTIONS;
   * - 'GET': HTTP 请求 GET;
   * - 'HEAD': HTTP 请求 HEAD;
   * - 'POST': HTTP 请求 POST;
   * - 'PUT': HTTP 请求 PUT;
   * - 'DELETE': HTTP 请求 DELETE;
   * - 'TRACE': HTTP 请求 TRACE;
   * - 'CONNECT': HTTP 请求 CONNECT; */
  method: 'GET',
  /** 响应的数据类型
   *
   * 可选值：
   * - 'text': 响应的数据为文本;
   * - 'arraybuffer': 响应的数据为 ArrayBuffer;
   *
   * 最低基础库： `1.7.0` */
  responseType: 'text',
  /** 超时时间，单位为毫秒
   *
   * 最低基础库： `2.10.0` */
  timeout: 15000,
  validateStatus: status => status >= 200 && status < 300,
};

function getMergedValue(target: any, source: any) {
  if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
    return utils.merge(target, source);
  }
  if (utils.isPlainObject(source)) {
    return utils.merge({}, source);
  }
  if (utils.isArray(source)) {
    return source.slice();
  }
  return source;
}

export default (config: AxiosRequestConfig = {}): Options => {
  // 获取wx所有可设置参数的key
  const defaultConfigKeys = new Set(Object.keys(defaultConfig));
  // 获取传递的参数key
  const configKeys = Object.keys(config);
  // 定义请求参数对象
  let requestParmas: Options = defaultConfig;
  // 根据axios的BaseUrl和Url 拼接绝对路径url
  const fullPath = buildFullPath(config.baseURL, config.url);
  // 拼接params获取完成的请求path
  const path = buildURL(fullPath, config.params, config.paramsSerializer);
  // 过滤参数 筛选出只属于wx的
  for (let i = 0; i < configKeys.length; i++) {
    if (defaultConfigKeys.has(configKeys[i])) {
      const key = configKeys[i] as keyof AxiosRequestConfig;
      requestParmas = { ...requestParmas, [key]: config[key] };
    }
  }
  // 请求url赋值
  requestParmas.url = path;
  // method转大写
  requestParmas.method = requestParmas.method?.toUpperCase() as Options['method'];

  // https://github.com/axios/axios/blob/master/lib/defaults.js#L28
  // data参数类型判断赋值
  if (!utils.isUndefined(config.data)) {
    requestParmas.data = getMergedValue(undefined, config.data);
  }

  // 合并header参数
  if (!utils.isUndefined(config.headers)) {
    requestParmas.header = getMergedValue(requestParmas.header, config.headers);
  }
  // HTTP basic authentication
  if (!utils.isUndefined(config.auth)) {
    const username = config.auth?.username || '';
    const password = config.auth?.password
      ? decodeURIComponent(encodeURIComponent(config.auth.password))
      : '';
    requestParmas.header = getMergedValue(requestParmas.header, {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    });
  }

  // 返回转换之后的对象
  return requestParmas;
};
