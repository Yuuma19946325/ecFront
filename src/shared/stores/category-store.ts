import { defineStore } from 'pinia'
import { CategoryService } from '../service/category.service'
import { catchError, of } from 'rxjs'

// カテゴリーサービスをインスタンス化
const categoryService = new CategoryService()

export interface Category {
  categoryId: number
  categoryName: String
  updateDate: Date
  deleteDate: Date | null
  deleteFlag: boolean
}

export const useCategoryStore = defineStore('category-store', {
  state: () => ({
    categoryList: new Array() as Category[]
  }),
  getters: {
    categoryList(state): Category[] {
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
        .subscribe(
          (response) => {
            // categoryListを直接置き換えるのではなく、spliceを使用して更新
            this.categoryList.splice(0, this.categoryList.length, ...(response as Category[]))
          },
          (err) => {
            console.error('Error:', err)
          }
        )
    }
  }
})
