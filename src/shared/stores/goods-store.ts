import { defineStore } from 'pinia'
import { catchError } from 'rxjs/operators'
import { GoodsService } from '@/shared/service/goods.service'
import { of } from 'rxjs'

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
  updateDate: Date
  deleteDate: Date
  deleteFlag: boolean
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
            return of([])
          })
        )
        .subscribe({
          next: (response) => {
            this.goods = response as Goods[]
          },
          error: (err) => {
            console.error('Error:', err)
          }
        })
    }
  }
})
