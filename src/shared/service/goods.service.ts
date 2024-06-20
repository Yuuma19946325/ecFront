import type { Observable } from 'rxjs'
import type { Goods } from '../stores/goods-store'
import { HttpClientService } from '../api/api-common'
import { URLS } from '../api/endpoints'
import type { ErrorResponse } from '../stores/error-response-store'

export class GoodsService extends HttpClientService {
  // 商品追加
  postCategory(goods: Goods): Observable<ErrorResponse> {
    return this.post(URLS['goods'], goods)
  }

  // 商品一覧取得
  getGoodsList(): Observable<Goods[]> {
    return this.get(URLS['goods'] + '/list')
  }

  // 商品削除
  deleteGoods(goodsId: number): Observable<ErrorResponse> {
    return this.delete(URLS['goods'] + `/${goodsId}`)
  }
}
