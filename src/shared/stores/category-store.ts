import { defineStore } from 'pinia'
import { CategoryService } from '../service/category.service'
import { catchError, map, of } from 'rxjs'
import { useErrorResponseStore, type ErrorResponse } from './error-response-store'

// カテゴリーサービスをインスタンス化
const categoryService = new CategoryService()

const errorResponseStore = useErrorResponseStore()

export interface Category {
  categoryId?: number
  categoryName: String
  updateDate?: Date
  deleteDate?: Date | null
  deleteFlag?: boolean
}

export const useCategoryStore = defineStore('category-store', {
  state: () => ({
    categoryList: new Array() as Category[]
  }),
  getters: {
    getCategoryList(state): Category[] {
      return state.categoryList
    }
  },
  actions: {
    increment(): void {
      categoryService
        .getCategoryList()
        .pipe(
          catchError((err) => {
            console.error(err)
            // エラー発生時には空配列を返す
            return of([])
          })
        )
        .subscribe({
          next: (response) => {
            this.categoryList = response as Category[]
          },
          error: (err) => {
            console.error('Error:', err)
          }
        })
    },
    add(category: Category): void {
      categoryService
        .postCategory(category)
        .pipe(
          map((response) => response as ErrorResponse),
          catchError((error): never => {
            const errorResponse: ErrorResponse = {
              result: error.result || true,
              status: error.status || 500,
              message: error.message || 'Unknown error'
            }
            throw errorResponse
          })
        )
        .subscribe({
          next: (response: ErrorResponse) => {
            errorResponseStore.setError(response)
          },
          error: (err) => {
            console.error('Error:', err)
          }
        })
    }
  }
})
