/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
// Polyfill from  https://github.com/MaxArt2501/base64-js/blob/master/base64.js

export const btoa = (string: string) => {
  const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const str = String(string);
  let bitmap;
  let a;
  let b;
  let c;
  let result = '';
  let i = 0;
  const rest = str.length % 3; // To determine the final padding

  for (; i < str.length; ) {
    if ((a = str.charCodeAt(i++)) > 255 || (b = str.charCodeAt(i++)) > 255 || (c = str.charCodeAt(i++)) > 255)
      throw new TypeError(
        "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
      );
    bitmap = (a << 16) | (b << 8) | c;
    result +=
      b64.charAt((bitmap >> 18) & 63) +
      b64.charAt((bitmap >> 12) & 63) +
      b64.charAt((bitmap >> 6) & 63) +
      b64.charAt(bitmap & 63);
  }

  // If there's need of padding, replace the last 'A's with equal signs
  return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result;
};
