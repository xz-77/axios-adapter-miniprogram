import { AxiosRequestConfig, AxiosResponse } from 'axios';
import createError from 'axios/lib/core/createError';
import settle from 'axios/lib/core/settle';
import mergeConfig, { Options } from '../core/mergeConfig';

const transformResponse = (
  result: WechatMiniprogram.RequestSuccessCallbackResult<string | WechatMiniprogram.IAnyObject | ArrayBuffer>,
  config: AxiosRequestConfig,
  weChatRequest: WechatMiniprogram.RequestTask
) => {
  const { statusCode: status, errMsg, data, header: headers } = result;
  return {
    status,
    statusText: errMsg,
    headers,
    config,
    request: weChatRequest,
    data,
  };
};

const adapter: (config: AxiosRequestConfig) => Promise<AxiosResponse<any>> = config => {
  const data: Options = mergeConfig(config);

  const wxAdapter: Promise<AxiosResponse> = new Promise((resolve, reject) => {
    let requestTast: WechatMiniprogram.RequestTask | null = wx.request({
      ...data,
      success: res =>
        settle(resolve, reject, transformResponse(res, config, requestTast as WechatMiniprogram.RequestTask)),
      fail: err => reject(createError('wechat Request failed', config, null, requestTast, err)),
    });

    // Handle Error request method
    const method = new Set(['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT']);
    if (!method.has(data.method)) {
      requestTast?.abort();
      reject(createError(`this ${data.method} method is wrong`, config, null, requestTast));
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(cancel => {
        if (!requestTast) return;
        requestTast.abort();
        requestTast = null;
        reject(cancel);
      });
    }
  });
  return wxAdapter;
};

export default adapter;
