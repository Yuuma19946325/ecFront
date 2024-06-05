import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ajax } from 'rxjs/ajax'
import { catchError, map } from 'rxjs/operators'
import { BASE_URL } from '../api/endpoints'
import { GoodsService } from '@/shared/service/goods.service'

// 商品サービスをインスタンス化
const goodsService = new GoodsService()

export interface Goods {
  goodsId: number
  goodsName: String
  categoryId: number
  amount: number
  stock: number
  set: number
  material: string
  brand: string
  theme: string
  target: number
  point: number
  image: any
}

export const useGoodsStore = defineStore('goods-store', {
  state: () => ({
    goods: [] as Goods[]
  }),
  getters: {
    goodsList(state): Goods[] {
      return state.goods
    }
  },
  actions: {
    increment(): void {
      goodsService
        .getGoodsList()
        .pipe(
          catchError((err) => {
            console.error(err)
            return err
          })
        )
        .subscribe((response) => {
          this.goods = response as Goods[]
        })
    }
  }
})
