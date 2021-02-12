type ParamsType = {
    hasHeader?: boolean;
    headers?: Record<string, string>;
    method?: "GET" | "POST" | "PUT";
    url: string;
    data?: string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null ;
}



/**
 * Set up request headers
 * @param xhr
 * @param params
 */
function setUpRequestHeaders(
  xhr: XMLHttpRequest,
  params: ParamsType
) {
  const { hasHeader = true, headers = {} } = params;
  if (hasHeader) {
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    const keys = Object.keys(headers);
    let i;
    for (i = 0; i < keys.length; i += 1) {
      const item = keys[i];
      xhr.setRequestHeader(item, headers[item]);
    }
  }
}



/**
 *
 * @param params {object}
 * @param resolve {function}
 * @param reject {function}
 */


/**
 * Handle XMLHttpRequest
 * @param params {Object}
 * @returns {Promise<any>}
 */
export async function httpClient(params: ParamsType) {
  const { method = "GET", url, data } = params;
  return new Promise((resolve, reject) => {
    if (!url) {
      reject({ status: 404, data: "no data" });
      return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open(method, `http://localhost:9000${url}`, true);

    setUpRequestHeaders(xhr, params);

    xhr.onload = () => {
      switch (xhr.status) {
        case 200:
          let res;
          if (xhr.response !== "") {
            res = JSON.parse(xhr.response);
          }
          resolve(res);
          break;

        case 404:
          reject({ status: xhr.status });
          break;
        default:
          let error = JSON.parse(xhr.response);
          reject({ error, status: xhr.status });
          break;
      }
    };
    data && data !== "" ? xhr.send(data) : xhr.send();
  });
}
