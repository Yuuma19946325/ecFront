import type { Observable } from 'rxjs'
import { HttpClientService } from '../api/api-common'
import { URLS } from '../api/endpoints'
import type { Category } from '../stores/category-store'
import type { ErrorResponse } from '../stores/error-response-store'

export class CategoryService extends HttpClientService {
  // カテゴリ追加
  postCategory(category: Category): Observable<ErrorResponse> {
    return this.post(URLS['category'], category)
  }

  // カテゴリ取得
  getCategoryList(): Observable<Category> {
    return this.get(URLS['category'] + '/list')
  }

  // カテゴリ更新
  putCategory(category: Category): Observable<ErrorResponse> {
    return this.put(URLS['category'] + `/${category.categoryId}`, category)
  }

  // カテゴリ停止
  deleteCategory(categoryId: number): Observable<ErrorResponse> {
    return this.delete(URLS['category'] + `/${categoryId}`)
  }
}
