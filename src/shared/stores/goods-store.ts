import { defineStore } from 'pinia'
import { catchError, map } from 'rxjs/operators'
import { GoodsService } from '@/shared/service/goods.service'
import { useErrorResponseStore, type ErrorResponse } from './error-response-store'

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
    }
  }
})
