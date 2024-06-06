import type { Observable } from 'rxjs'
import type { Goods } from '../stores/goods-store'
import { HttpClientService } from '../api/api-common'
import { URLS } from '../api/endpoints'

export class GoodsService extends HttpClientService {
  // 商品一覧取得
  getGoodsList(): Observable<Goods[]> {
    return this.get(URLS['goods'] + '/list')
  }
}
