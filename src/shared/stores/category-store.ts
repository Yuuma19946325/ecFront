import { defineStore } from 'pinia'
import { CategoryService } from '../service/category.service'
import { catchError, map } from 'rxjs'
import {
  handleErrors,
  subscribeWithCommonHandlingIncrementCallback,
  useErrorResponseStore,
  type ErrorResponse
} from './error-response-store'
import { watch } from 'vue'

// カテゴリーサービスをインスタンス化
const categoryService = new CategoryService()

export interface Category {
  categoryId?: number
  categoryName: string
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
    },
    getCategoryNameById:
      (state) =>
      (categoryId: number): string => {
        const category: Category | undefined = state.categoryList.find(
          (category) => category.categoryId === categoryId
        )
        return category?.categoryName ?? ''
      },
    getCategoryOperationList(state): Category[] {
      return state.categoryList.filter((category) => category.deleteFlag === false)
    },
    getCategoryStopList(state): Category[] {
      return state.categoryList.filter((category) => category.deleteFlag === true)
    }
  },
  actions: {
    increment(): void {
      categoryService
        .getCategoryList()
        .pipe(
          map((response) => response as Category[]),
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
          next: (response: Category[]) => {
            this.categoryList = response as Category[]
          },
          error: (error: ErrorResponse) => {
            useErrorResponseStore().setError(error)
          }
        })
    },
    add(category: Category): void {
      const observable = categoryService.postCategory(category)
      subscribeWithCommonHandlingIncrementCallback(handleErrors(observable), this.increment)
    },
    update(categoryId: number, category: Category): void {
      const observable = categoryService.putCategory(categoryId, category)
      subscribeWithCommonHandlingIncrementCallback(handleErrors(observable), this.increment)
    },
    delete(categoryId: number): void {
      const observable = categoryService.deleteCategory(categoryId)
      subscribeWithCommonHandlingIncrementCallback(handleErrors(observable), this.increment)
    }
  }
})

export function watchCategoryList(callback: (newValue: Category[], oldValue: Category[]) => void) {
  const categoryStore = useCategoryStore()
  watch(() => categoryStore.categoryList, callback)
}
