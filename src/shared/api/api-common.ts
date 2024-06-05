import { from, Observable } from 'rxjs'
import { BASE_URL } from '../api/endpoints'

const apiClient = {
  get(url: RequestInfo | URL) {
    return from(
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
    )
  },
  post(url: RequestInfo | URL, data: any) {
    return from(
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => response.json())
    )
  },
  put(url: RequestInfo | URL, data: any) {
    return from(
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => response.json())
    )
  },
  delete(url: RequestInfo) {
    return from(
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
    )
  }
}

/**
 * APIリクエスト処理の基盤となるクラス
 * APIリクエスト時の共通処理を行う
 *
 * @export
 * @class HttpClientService
 */
export class HttpClientService {
  /**
   * GETリクエスト
   *
   * @param {string} [endpoint='']
   * @memberof HttpClientService
   */
  public get(endpoint: string = ''): Observable<any> {
    return apiClient.get(`${BASE_URL}/${endpoint}`)
  }

  /**
   * POSTリクエスト
   *
   * @param {string} [endpoint='']
   * @param {Object} [data='']
   * @memberof HttpClientService
   */
  public post(endpoint: string = '', data: Object): Observable<any> {
    return apiClient.post(`${BASE_URL}/${endpoint}`, data)
  }

  /**
   * PUTリクエスト
   *
   * @param {string} [endpoint='']
   * @param {Object} [data='']
   * @memberof HttpClientService
   */
  public put(endpoint: string = '', data: Object): Observable<any> {
    return apiClient.put(`${BASE_URL}/${endpoint}`, data)
  }

  /**
   * DELETEリクエスト
   *
   * @param {string} [endpoint='']
   * @memberof HttpClientService
   */
  public delete(endpoint: string = ''): Observable<any> {
    return apiClient.delete(`${BASE_URL}/${endpoint}`)
  }
}
