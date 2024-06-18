import { defineStore } from 'pinia'
import { catchError, map } from 'rxjs/operators'
import { GoodsService } from '@/shared/service/goods.service'
import {
  handleErrors,
  subscribeWithCommonHandlingIncrementCallback,
  useErrorResponseStore,
  type ErrorResponse
} from './error-response-store'
import { watch } from 'vue'

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
    goodsList: [] as Goods[]
  }),
  getters: {
    getGoodsList(state): Goods[] {
      return state.goodsList
    },
    getGoodsById:
      (state) =>
      (goodsId: number): Goods => {
        const goods: Goods | undefined = state.goodsList.find((goods) => goods.goodsId === goodsId)
        return goods ?? (new Object() as Goods)
      }
  },
  actions: {
    increment(): void {
      goodsService
        .getGoodsList()
        .pipe(
          map((response) => response as Goods[]),
          catchError((error) => {
            const errorResponse: ErrorResponse = {
              result: error.result || true,
              status: error.status || 500,
              message: error.message || 'Unknown error'
            }
            throw errorResponse
          })
        )
        .subscribe({
          next: (response: Goods[]) => {
            this.goodsList = response as Goods[]
          },
          error: (error: ErrorResponse) => {
            useErrorResponseStore().setError(error)
          }
        })
    },
    delete(goodsId: number): void {
      const observable = goodsService.deleteGoods(goodsId)
      subscribeWithCommonHandlingIncrementCallback(handleErrors(observable), this.increment)
    }
  }
})

export function watchGoodsList(callback: (newValue: Goods[], oldValue: Goods[]) => void) {
  const goodsStore = useGoodsStore()
  watch(() => goodsStore.getGoodsList, callback)
}
