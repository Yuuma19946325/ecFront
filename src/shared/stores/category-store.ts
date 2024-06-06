import { defineStore } from 'pinia'
import { CategoryService } from '../service/category.service'
import { catchError, of } from 'rxjs'
import { handleErrors, subscribeWithCommonHandling } from './error-response-store'

// カテゴリーサービスをインスタンス化
const categoryService = new CategoryService()

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
      const observable = categoryService.postCategory(category)
      subscribeWithCommonHandling(handleErrors(observable), this.increment)
    },
    update(categoryId: number, category: Category): void {
      const observable = categoryService.putCategory(categoryId, category)
      subscribeWithCommonHandling(handleErrors(observable), this.increment)
    },
    delete(categoryId: number): void {
      const observable = categoryService.deleteCategory(categoryId)
      subscribeWithCommonHandling(handleErrors(observable), this.increment)
    }
  }
})
