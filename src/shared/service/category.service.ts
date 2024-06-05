import type { Observable } from 'rxjs'
import { HttpClientService } from '../api/api-common'
import { URLS } from '../api/endpoints'
import type { Category } from '../stores/category-store'

export class CategoryService extends HttpClientService {
  // カテゴリ取得
  getCategoryList(): Observable<Category> {
    return this.get(URLS['category'] + '/list')
  }
}
